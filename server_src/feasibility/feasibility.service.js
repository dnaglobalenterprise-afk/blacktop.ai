"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeasibilityService = void 0;
var common_1 = require("@nestjs/common");
function overlaps(aStart, aEnd, bStart, bEnd) {
    var a1 = new Date(aStart).getTime();
    var a2 = new Date(aEnd).getTime();
    var b1 = new Date(bStart).getTime();
    var b2 = new Date(bEnd).getTime();
    return a1 <= b2 && b1 <= a2;
}
var FeasibilityService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FeasibilityService = _classThis = /** @class */ (function () {
        function FeasibilityService_1(loadsService, trucksService, assignmentsService) {
            this.loadsService = loadsService;
            this.trucksService = trucksService;
            this.assignmentsService = assignmentsService;
        }
        FeasibilityService_1.prototype.checkAssignment = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var blockingIssues, warnings, load, fn, _a, truck, fn, _b, allAssignments, fn, _c, activeAssignments, pickup, delivery, loadStart, loadEnd, _i, _d, w, durationHours, allowed;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            blockingIssues = [];
                            warnings = [];
                            load = null;
                            if (!(typeof this.loadsService.findOne === 'function')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.loadsService.findOne(input.loadId)];
                        case 1:
                            load = _g.sent();
                            return [3 /*break*/, 10];
                        case 2:
                            if (!(typeof this.loadsService.findById === 'function')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.loadsService.findById(input.loadId)];
                        case 3:
                            load = _g.sent();
                            return [3 /*break*/, 10];
                        case 4:
                            if (!(typeof this.loadsService.get === 'function')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.loadsService.get(input.loadId)];
                        case 5:
                            load = _g.sent();
                            return [3 /*break*/, 10];
                        case 6:
                            _g.trys.push([6, 9, , 10]);
                            fn = this.loadsService['findOne'] || this.loadsService['findById'] || this.loadsService['get'];
                            if (!(typeof fn === 'function')) return [3 /*break*/, 8];
                            return [4 /*yield*/, fn.call(this.loadsService, input.loadId)];
                        case 7:
                            load = _g.sent();
                            _g.label = 8;
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            _a = _g.sent();
                            load = null;
                            return [3 /*break*/, 10];
                        case 10:
                            if (!load) {
                                blockingIssues.push('Load not found');
                            }
                            truck = null;
                            if (!(typeof this.trucksService.findOne === 'function')) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.trucksService.findOne(input.truckId)];
                        case 11:
                            truck = _g.sent();
                            return [3 /*break*/, 20];
                        case 12:
                            if (!(typeof this.trucksService.findById === 'function')) return [3 /*break*/, 14];
                            return [4 /*yield*/, this.trucksService.findById(input.truckId)];
                        case 13:
                            truck = _g.sent();
                            return [3 /*break*/, 20];
                        case 14:
                            if (!(typeof this.trucksService.get === 'function')) return [3 /*break*/, 16];
                            return [4 /*yield*/, this.trucksService.get(input.truckId)];
                        case 15:
                            truck = _g.sent();
                            return [3 /*break*/, 20];
                        case 16:
                            _g.trys.push([16, 19, , 20]);
                            fn = this.trucksService['findOne'] || this.trucksService['findById'] || this.trucksService['get'];
                            if (!(typeof fn === 'function')) return [3 /*break*/, 18];
                            return [4 /*yield*/, fn.call(this.trucksService, input.truckId)];
                        case 17:
                            truck = _g.sent();
                            _g.label = 18;
                        case 18: return [3 /*break*/, 20];
                        case 19:
                            _b = _g.sent();
                            truck = null;
                            return [3 /*break*/, 20];
                        case 20:
                            if (!truck) {
                                blockingIssues.push('Truck not found');
                            }
                            allAssignments = [];
                            _g.label = 21;
                        case 21:
                            _g.trys.push([21, 38, , 39]);
                            if (!(typeof this.assignmentsService.findAll === 'function')) return [3 /*break*/, 23];
                            return [4 /*yield*/, this.assignmentsService.findAll()];
                        case 22:
                            allAssignments = _g.sent();
                            return [3 /*break*/, 37];
                        case 23:
                            if (!(typeof this.assignmentsService.find === 'function')) return [3 /*break*/, 25];
                            return [4 /*yield*/, this.assignmentsService.find()];
                        case 24:
                            allAssignments = _g.sent();
                            return [3 /*break*/, 37];
                        case 25:
                            if (!(typeof this.assignmentsService.findMany === 'function')) return [3 /*break*/, 27];
                            return [4 /*yield*/, this.assignmentsService.findMany()];
                        case 26:
                            allAssignments = _g.sent();
                            return [3 /*break*/, 37];
                        case 27:
                            if (!(typeof this.assignmentsService.list === 'function')) return [3 /*break*/, 29];
                            return [4 /*yield*/, this.assignmentsService.list()];
                        case 28:
                            allAssignments = _g.sent();
                            return [3 /*break*/, 37];
                        case 29:
                            if (!(typeof this.assignmentsService.getAll === 'function')) return [3 /*break*/, 31];
                            return [4 /*yield*/, this.assignmentsService.getAll()];
                        case 30:
                            allAssignments = _g.sent();
                            return [3 /*break*/, 37];
                        case 31:
                            if (!(typeof this.assignmentsService.query === 'function')) return [3 /*break*/, 33];
                            return [4 /*yield*/, this.assignmentsService.query({})];
                        case 32:
                            allAssignments = _g.sent();
                            return [3 /*break*/, 37];
                        case 33:
                            if (!(typeof this.assignmentsService.get === 'function')) return [3 /*break*/, 35];
                            return [4 /*yield*/, this.assignmentsService.get()];
                        case 34:
                            allAssignments = _g.sent();
                            return [3 /*break*/, 37];
                        case 35:
                            fn = this.assignmentsService['findAll'] ||
                                this.assignmentsService['find'] ||
                                this.assignmentsService['findMany'] ||
                                this.assignmentsService['list'] ||
                                this.assignmentsService['getAll'] ||
                                this.assignmentsService['query'] ||
                                this.assignmentsService['get'];
                            if (!(typeof fn === 'function')) return [3 /*break*/, 37];
                            return [4 /*yield*/, fn.call(this.assignmentsService)];
                        case 36:
                            allAssignments = _g.sent();
                            _g.label = 37;
                        case 37: return [3 /*break*/, 39];
                        case 38:
                            _c = _g.sent();
                            allAssignments = [];
                            return [3 /*break*/, 39];
                        case 39:
                            activeAssignments = (allAssignments || [])
                                .filter(function (a) {
                                return a.driverId === input.driverId &&
                                    (a.status === 'ASSIGNED');
                            });
                            if (activeAssignments.length > 0) {
                                blockingIssues.push('Driver already assigned to another active load');
                            }
                            // ---------- Maintenance conflict check (BLOCK) ----------
                            // If we have a load with stops, we can use pickup->delivery window (basic)
                            if (((_e = load === null || load === void 0 ? void 0 : load.stops) === null || _e === void 0 ? void 0 : _e.length) && ((_f = truck === null || truck === void 0 ? void 0 : truck.maintenance) === null || _f === void 0 ? void 0 : _f.length)) {
                                pickup = load.stops[0];
                                delivery = load.stops[load.stops.length - 1];
                                loadStart = pickup.appointmentStart;
                                loadEnd = delivery.appointmentEnd;
                                for (_i = 0, _d = truck.maintenance; _i < _d.length; _i++) {
                                    w = _d[_i];
                                    if (!(w === null || w === void 0 ? void 0 : w.start) || !(w === null || w === void 0 ? void 0 : w.end))
                                        continue;
                                    if (overlaps(loadStart, loadEnd, w.start, w.end)) {
                                        blockingIssues.push('Truck maintenance overlaps load appointment window');
                                        break;
                                    }
                                }
                                durationHours = (new Date(loadEnd).getTime() - new Date(loadStart).getTime()) / (1000 * 60 * 60);
                                if (durationHours > 0 && durationHours <= 12) {
                                    warnings.push('Tight pickup-to-delivery window (<= 12 hours)');
                                }
                            }
                            else {
                                // If we don’t have full stop windows yet, warn only
                                warnings.push('Limited load schedule data — feasibility based on partial information');
                            }
                            allowed = blockingIssues.length === 0;
                            return [2 /*return*/, {
                                    allowed: allowed,
                                    blockingIssues: blockingIssues,
                                    warnings: warnings,
                                    explanation: allowed
                                        ? 'Feasible: no blocking conflicts detected. Review warnings if any.'
                                        : 'Blocked: conflicts detected that require human resolution.',
                                    data: {
                                        loadFound: !!load,
                                        truckFound: !!truck,
                                        activeDriverAssignments: activeAssignments.map(function (a) { return a.id; }),
                                    },
                                }];
                    }
                });
            });
        };
        return FeasibilityService_1;
    }());
    __setFunctionName(_classThis, "FeasibilityService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FeasibilityService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FeasibilityService = _classThis;
}();
exports.FeasibilityService = FeasibilityService;
