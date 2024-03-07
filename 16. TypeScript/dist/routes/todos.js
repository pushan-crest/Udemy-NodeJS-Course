"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const date_fns_1 = require("date-fns");
const router = (0, express_1.Router)();
let todos = [];
router.get("/", (req, res, next) => {
    res.status(200).send({ todo: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: (0, date_fns_1.format)(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
        title: body.title,
        completed: body.completed,
    };
    todos.push(newTodo);
    res.status(201).send({ message: "Todos Added!" });
});
router.put("/todo/:todoid", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const id = params.todoid;
    const index = todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
        todos[index] = {
            id: id,
            title: body.title,
            completed: body.completed,
        };
        return res.status(200).json({ message: "Todo Updated ", todo: todos });
    }
    res.status(404).json({ message: "Todo Not Found" });
}));
// create new route for delete todos using id similar to above
router.delete("/todos/:todoid", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const id = params.todoid;
    const index = todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
        todos.splice(index, 1);
        res.status(200).json({ message: "Todo Deleted" });
    }
    res.status(404).json({ message: "Todo Not Found" });
}));
exports.default = router;
