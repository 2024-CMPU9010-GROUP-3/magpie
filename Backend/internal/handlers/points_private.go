//go:build private

package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	db "github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/db/private"
	customErrors "github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/errors"
	resp "github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/responses"
	"github.com/twpayne/go-geom"
	"github.com/twpayne/go-geom/encoding/geojson"
	// geos "github.com/twpayne/go-geom"
)

type PointDto struct {
	Longlat geojson.Geometry `json:"longlat"`
	Type    string           `json:"type"`
	Details any              `json:"details"` // potentially unsafe, but we need to accept any json object here
}

type PointIdDto struct {
	Id int64 `json:"id"`
}

func (p *PointsHandler) HandlePost(w http.ResponseWriter, r *http.Request) {
	dbQueries := db.New(dbConn)

	var point PointDto
	err := json.NewDecoder(r.Body).Decode(&point)
	if err != nil {
		resp.SendError(customErrors.Payload.InvalidPayloadPointError, w)
		return
	}

	encodedJson, err := json.Marshal(point.Details)
	if err != nil {
		resp.SendError(customErrors.Internal.JsonEncodingError, w)
		return
	}

	geometry, err := point.Longlat.Decode()
	if err != nil {
		resp.SendError(customErrors.Payload.InvalidPayloadPointError.WithCause(err), w)
		return
	}

	pt, ok := geometry.(*geom.Point)
	if !ok {
		resp.SendError(customErrors.Payload.InvalidPayloadPointError, w)
		return
	}

	createPointParams := db.CreatePointParams{
		Longlat: pt,
		Type:    db.PointType(point.Type),
		Details: encodedJson,
	}

	pointId, err := dbQueries.CreatePoint(*dbCtx, createPointParams)
	if err != nil {
		resp.SendError(customErrors.Database.UnknownDatabaseError.WithCause(err), w)
		return
	}

	resp.SendResponse(resp.Response{Content: PointIdDto{pointId}, HttpStatus: http.StatusCreated}, w)
}

func (p *PointsHandler) HandlePut(w http.ResponseWriter, r *http.Request) {

	// careful: if an ID was given that doesn't exist, no changes are made to the database
	// there is currently no mechanism that notifies the frontend if any actual changes were made

	pointIdPathParam := r.PathValue("id")
	pointId, err := strconv.ParseInt(pointIdPathParam, 10, 64)

	// bad request if id can't be parsed to int
	if err != nil {
		resp.SendError(customErrors.Parameter.InvalidUUIDError, w)
		return
	}

	dbQueries := db.New(dbConn)

	var point PointDto
	err = json.NewDecoder(r.Body).Decode(&point)
	if err != nil {
		resp.SendError(customErrors.Payload.InvalidPayloadPointError, w)
		return
	}

	if len(point.Type) == 0 {
		resp.SendError(customErrors.Parameter.RequiredParameterMissingError.WithCause(fmt.Errorf("Field \"Type\" cannot be empty")), w)
		return
	}

	encodedJson, err := json.Marshal(point.Details)
	if err != nil {
		resp.SendError(customErrors.Internal.JsonEncodingError, w)
		return
	}

	geometry, err := point.Longlat.Decode()
	if err != nil {
		resp.SendError(customErrors.Payload.InvalidPayloadPointError.WithCause(err), w)
		return
	}

	pt, ok := geometry.(*geom.Point)
	if !ok {
		resp.SendError(customErrors.Payload.InvalidPayloadPointError, w)
		return
	}

	updatePointParams := db.UpdatePointParams{
		ID:      pointId,
		Longlat: pt,
		Type:    db.PointType(point.Type),
		Details: encodedJson,
	}

	err = dbQueries.UpdatePoint(*dbCtx, updatePointParams)
	if err != nil {
		resp.SendError(customErrors.Database.UnknownDatabaseError.WithCause(err), w)
		return
	}

	resp.SendResponse(resp.Response{Content: PointIdDto{pointId}, HttpStatus: http.StatusAccepted}, w)
}

func (p *PointsHandler) HandleDelete(w http.ResponseWriter, r *http.Request) {

	pointIdPathParam := r.PathValue("id")
	pointId, err := strconv.ParseInt(pointIdPathParam, 10, 64)

	// bad request if id can't be parsed to int
	if err != nil {
		resp.SendError(customErrors.Parameter.InvalidIntError, w)
		return
	}

	dbQueries := db.New(dbConn)

	err = dbQueries.DeletePoint(*dbCtx, pointId)
	if err != nil {
		resp.SendError(customErrors.Database.UnknownDatabaseError.WithCause(err), w)
		return
	}

	resp.SendResponse(resp.Response{Content: PointIdDto{pointId}, HttpStatus: http.StatusAccepted}, w)
}
