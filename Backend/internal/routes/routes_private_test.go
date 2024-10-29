//go:build private

package routes

import (
	"fmt"
	"testing"
)

func TestA(t *testing.T) {
	t.Error("failing test")
}

func TestB(t *testing.T) {
	t.Skip("skipping test")
}

func TestC(t *testing.T) {
	fmt.Println("succeeding test")
}
