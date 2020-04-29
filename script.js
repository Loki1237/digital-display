"use strict";

const inputField = document.getElementById("input_field");
const display = document.getElementById("display");
const ctx = display.getContext('2d');
display.height = 144;
display.width  = 0;
ctx.fillStyle = "#080";

const GRID_MATRIX = [];
const PIXEL_SIZE = 8;
const CELL_WIDTH = 10;
let buffer = "";
let moving = false;

const initMatrix = () => {
    GRID_MATRIX.length = 0;

    for (let r = 0; r < display.height; r += PIXEL_SIZE) {
        let row = [];

        for (let c = 0; c < display.width; c += PIXEL_SIZE) {
            row.push({ x: c, y: r });
        }

        GRID_MATRIX.push(row);
    }
}

const createPixel = (point) => {
    ctx.fillStyle = "#080";
    ctx.fillRect(point.x, point.y, PIXEL_SIZE, PIXEL_SIZE);
}

const createSymbol = (symbol, cell) => {
    for (let r = 0; r < 14; r++) {
        for (let c = 0; c < 8; c++) {
            if (symbols[symbol][r][c]) {
                createPixel(GRID_MATRIX[r+2][cell+c]);
            }
        }
    }
}

const clearDisplay = () => {
    ctx.clearRect(0, 0, display.width, display.height);
}

const renderDisplay = () => {
    clearDisplay();
    let currentColumn = 2;

    for (let i = 0; i < buffer.length; i++) {
        if (buffer[i] !== " ") createSymbol(buffer[i], currentColumn);
        currentColumn += CELL_WIDTH;
    }
}

const startMoving = () => {
    moving = true;
    display.style.animation = `display_moving infinite ${buffer.length / 2}s linear`;
}

const stopMoving = () => {
    moving = false;
    display.style.animation = `none`;
}

initMatrix();

inputField.onkeyup = (e) => {
    if (!/[a-z A-Z 0-9 \_\-\+\=\!\?]/.test(e.key)) {
        e.target.value = e.target.value.slice(0, e.target.value.length - 1);
        return;
    }

    buffer = e.target.value.toUpperCase();
    display.width = buffer.length * CELL_WIDTH * PIXEL_SIZE + (PIXEL_SIZE * 2);
    initMatrix();
    renderDisplay();

    if (buffer.length > 16) {
        if (!moving) {
            startMoving();
        } else {
            display.style.animationDuration = `${buffer.length / 2}s`;
        }
    } else {
        if (moving) {
            stopMoving();
        }
    }
}