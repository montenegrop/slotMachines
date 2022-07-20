"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Machine = void 0;
const typeorm_1 = require("typeorm");
let Machine = class Machine extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Machine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Machine.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", String)
], Machine.prototype, "roi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', array: true }),
    __metadata("design:type", Array)
], Machine.prototype, "NormalReels", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', array: true }),
    __metadata("design:type", Array)
], Machine.prototype, "FSReels", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true
    }),
    __metadata("design:type", Object)
], Machine.prototype, "Payments", void 0);
Machine = __decorate([
    (0, typeorm_1.Entity)()
], Machine);
exports.Machine = Machine;
