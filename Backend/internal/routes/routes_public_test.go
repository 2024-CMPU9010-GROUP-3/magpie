//go:build public

package routes

import (
	"fmt"
	"testing"
)

func TestD(t *testing.T) {
	t.Error("failing test")
}

func TestE(t *testing.T) {
	t.Skip("skipping test")
}

func TestF(t *testing.T) {
	fmt.Println("succeeding test")
}
