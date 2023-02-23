"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const benchmark_1 = __importDefault(require("benchmark"));
const index_1 = require("../index");
const doubleSuite = new benchmark_1.default.Suite("z.discriminatedUnion: double");
const manySuite = new benchmark_1.default.Suite("z.discriminatedUnion: many");
const nestedSuite = new benchmark_1.default.Suite("z.discriminatedUnion: nested");
const aSchema = index_1.z.object({
    type: index_1.z.literal("a"),
});
const objA = {
    type: "a",
};
const bSchema = index_1.z.object({
    type: index_1.z.literal("b"),
});
const objB = {
    type: "b",
};
const cSchema = index_1.z.object({
    type: index_1.z.literal("c"),
});
const objC = {
    type: "c",
};
const dSchema = index_1.z.object({
    type: index_1.z.literal("d"),
});
const double = index_1.z.discriminatedUnion("type", [aSchema, bSchema]);
const many = index_1.z.discriminatedUnion("type", [aSchema, bSchema, cSchema, dSchema]);
const nested = index_1.z.discriminatedUnion("type", [double, cSchema, dSchema]);
doubleSuite
    .add("valid: a", () => {
    double.parse(objA);
})
    .add("valid: b", () => {
    double.parse(objB);
})
    .add("invalid: null", () => {
    try {
        double.parse(null);
    }
    catch (err) { }
})
    .add("invalid: wrong shape", () => {
    try {
        double.parse(objC);
    }
    catch (err) { }
})
    .on("cycle", (e) => {
    console.log(`${doubleSuite.name}: ${e.target}`);
});
manySuite
    .add("valid: a", () => {
    many.parse(objA);
})
    .add("valid: c", () => {
    many.parse(objC);
})
    .add("invalid: null", () => {
    try {
        many.parse(null);
    }
    catch (err) { }
})
    .add("invalid: wrong shape", () => {
    try {
        many.parse({ type: "unknown" });
    }
    catch (err) { }
})
    .on("cycle", (e) => {
    console.log(`${manySuite.name}: ${e.target}`);
});
nestedSuite
    .add("valid: a", () => {
    nested.parse(objA);
})
    .add("valid: b", () => {
    nested.parse(objB);
})
    .add("valid: c", () => {
    nested.parse(objC);
})
    .add("invalid: null", () => {
    try {
        nested.parse(null);
    }
    catch (err) { }
})
    .add("invalid: wrong shape", () => {
    try {
        nested.parse(objC);
    }
    catch (err) { }
})
    .on("cycle", (e) => {
    console.log(`${nestedSuite.name}: ${e.target}`);
});
exports.default = {
    suites: [doubleSuite, manySuite, nestedSuite],
};
