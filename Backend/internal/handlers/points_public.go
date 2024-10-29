//go:build public

package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	db "github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/db/public"
	customErrors "github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/errors"
	resp "github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/responses"
	"github.com/jackc/pgx/v5"
	"github.com/twpayne/go-geom/encoding/geojson"
)

const floatPrecision = 32

type pointDto struct {
	Id      int64
	Longlat geojson.Geometry
	Type    db.PointType
}

func (p *PointsHandler) HandleGetByRadius(w http.ResponseWriter, r *http.Request) {
	// parameters long, lat, radius are required
	params := r.URL.Query()
	long, err_long := strconv.ParseFloat(params.Get("long"), floatPrecision)
	lat, err_lat := strconv.ParseFloat(params.Get("lat"), floatPrecision)
	radius, err_radius := strconv.ParseFloat(params.Get("radius"), floatPrecision)

	// bad request if any parameters can't be parsed to float
	if err_long != nil || err_lat != nil || err_radius != nil {
		resp.SendError(customErrors.Parameter.InvalidFloatError, w)
		return
	}

	points, err := db.New(dbConn).GetPointsInRadius(*dbCtx, db.GetPointsInRadiusParams{Latitude: lat, Longitude: long, Radius: radius})
	if err != nil {
		if !errors.Is(err, pgx.ErrNoRows) {
			resp.SendError(customErrors.Database.UnknownDatabaseError.WithCause(err), w)
			return
		}
	}

	pointDtos := []pointDto{}

	for _, p := range points {
		longlat, err := geojson.Encode(p.Longlat)
		if err != nil {
			resp.SendError(customErrors.Internal.UnknownError.WithCause(err), w)
			return
		} else {
			pointDtos = append(pointDtos, pointDto{
				p.ID,
				*longlat,
				p.Type,
			})
		}
	}
	resp.SendResponse(resp.Response{Content: pointDtos, HttpStatus: http.StatusOK}, w)
}

func (p *PointsHandler) HandleGetPointDetails(w http.ResponseWriter, r *http.Request) {
	pointIdPathParam := r.PathValue("id")
	pointId, err := strconv.ParseInt(pointIdPathParam, 10, 64)

	// bad request if id can't be parsed to int
	if err != nil {
		resp.SendError(customErrors.Parameter.InvalidUUIDError, w)
		return
	}

	pointDetailsBytes, err := db.New(dbConn).GetPointDetails(*dbCtx, pointId)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			resp.SendError(customErrors.NotFound.PointNotFoundError, w)
			return
		} else {
			resp.SendError(customErrors.Database.UnknownDatabaseError.WithCause(err), w)
			return
		}
	}

	// check if bytes received from database are valid json
	var decodedDetails json.RawMessage
	err = json.Unmarshal(pointDetailsBytes, &decodedDetails)
	if err != nil {
		resp.SendError(customErrors.Internal.JsonDecodingError, w)
		return
	}

	resp.SendResponse(resp.Response{Content: decodedDetails, HttpStatus: http.StatusOK}, w)
}
