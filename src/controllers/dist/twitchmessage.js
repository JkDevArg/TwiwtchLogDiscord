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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var discordMessageSend_1 = require("./discordMessageSend");
var openai_1 = require("../config/openai");
var usersControllers_1 = require("./usersControllers");
var validateCommands_1 = require("../utils/validateCommands");
var freeCommands_1 = require("../commands/freeCommands");
var twitchCommands = function (client, discordClient) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        client.on("message", function (channel, tags, message, self) { return __awaiter(void 0, void 0, void 0, function () {
            var args, command, isVIP, isTurbo, isBits, isSubscriber, isBroadcaster, isModerator, isPartner, msjSend, userName, userPermissions, commandPermissions, allowedCommands, freeComments, msg, models, modelString, msg, userName_1, userId, msg, res, msg, userId, res, msg, responseGPT, error_1;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        if (self)
                            return [2 /*return*/]; // ignore messages from the bot itself
                        args = message.slice(1).split(" ");
                        command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                        isVIP = ((_b = tags.badges) === null || _b === void 0 ? void 0 : _b.vip) != null;
                        isTurbo = ((_c = tags.badges) === null || _c === void 0 ? void 0 : _c.turbo) != null;
                        isBits = ((_d = tags.badges) === null || _d === void 0 ? void 0 : _d.bits) != null;
                        isSubscriber = ((_e = tags.badges) === null || _e === void 0 ? void 0 : _e.subscriber) != null;
                        isBroadcaster = ((_f = tags.badges) === null || _f === void 0 ? void 0 : _f.broadcaster) != null;
                        isModerator = ((_g = tags.badges) === null || _g === void 0 ? void 0 : _g.moderator) != null;
                        isPartner = ((_h = tags.badges) === null || _h === void 0 ? void 0 : _h.partner) != null;
                        msjSend = message ? message : '';
                        userName = tags.username ? tags.username : '';
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, userName + ": " + msjSend)];
                    case 1:
                        _j.sent();
                        return [4 /*yield*/, discordMessageSend_1.sendTwitchFromDiscord(discordClient, client)];
                    case 2:
                        _j.sent();
                        userPermissions = {
                            isVIP: isVIP,
                            isSubscriber: isSubscriber,
                            isBroadcaster: isBroadcaster,
                            isModerator: isModerator,
                            isPartner: isPartner
                        };
                        console.log(tags.badges);
                        commandPermissions = {
                            free: ['informacion', 'comandos', 'saludo'],
                            premium: ['models', 'gpt', 'registrar', 'puntos'],
                            followerOrHigher: ['registrar', 'puntos'],
                            moderatorOrHigher: ['models', 'gpt', 'registrar', 'puntos']
                        };
                        return [4 /*yield*/, validateCommands_1.validateCommands(command ? command : '', userPermissions, commandPermissions)];
                    case 3:
                        allowedCommands = _j.sent();
                        return [4 /*yield*/, freeCommands_1.getFreeComments(command ? command : '', userName)];
                    case 4:
                        freeComments = _j.sent();
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, freeComments)];
                    case 5:
                        _j.sent();
                        client.say(channel, freeComments);
                        if (!(command === "models")) return [3 /*break*/, 10];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 7];
                        msg = "Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 6:
                        _j.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 7: return [4 /*yield*/, openai_1.getModels()];
                    case 8:
                        models = _j.sent();
                        modelString = models.join(", ");
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "ChatGPT: " + modelString)];
                    case 9:
                        _j.sent();
                        client.say(channel, "ChatGPT: Modelos disponibles > " + modelString);
                        _j.label = 10;
                    case 10:
                        if (!(command === "registrar")) return [3 /*break*/, 16];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 12];
                        msg = "Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 11:
                        _j.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 12:
                        userName_1 = tags.username ? tags.username : '';
                        userId = tags["user-id"] ? tags["user-id"] : '';
                        msg = "Sistema: Registrando usuario...";
                        client.say(channel, msg);
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 13:
                        _j.sent();
                        return [4 /*yield*/, usersControllers_1.createUsers(userName_1, userId)];
                    case 14:
                        res = _j.sent();
                        client.say(channel, "Sistema: " + userName_1 + " " + res);
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "Sistema: " + userName_1 + " " + res)];
                    case 15:
                        _j.sent();
                        _j.label = 16;
                    case 16:
                        if (!(command === "puntos")) return [3 /*break*/, 21];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 18];
                        msg = "Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 17:
                        _j.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 18:
                        userId = tags["user-id"] ? tags["user-id"] : '';
                        return [4 /*yield*/, usersControllers_1.getUserPoints(userId)];
                    case 19:
                        res = _j.sent();
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "Sistema: " + res)];
                    case 20:
                        _j.sent();
                        client.say(channel, "Sistema: " + res);
                        _j.label = 21;
                    case 21:
                        if (!(command === "gpt")) return [3 /*break*/, 28];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 23];
                        msg = "sLo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 22:
                        _j.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 23:
                        if (!(message.length > 0)) return [3 /*break*/, 28];
                        _j.label = 24;
                    case 24:
                        _j.trys.push([24, 27, , 28]);
                        return [4 /*yield*/, openai_1.run(message)];
                    case 25:
                        responseGPT = _j.sent();
                        //Send discord msg from CHAT GPT
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "ChatGPT: " + responseGPT)];
                    case 26:
                        //Send discord msg from CHAT GPT
                        _j.sent();
                        client.say(channel, "ChatGPT: " + responseGPT);
                        return [3 /*break*/, 28];
                    case 27:
                        error_1 = _j.sent();
                        console.log(error_1);
                        return [3 /*break*/, 28];
                    case 28: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports["default"] = twitchCommands;
