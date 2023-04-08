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
var twitchFollower_1 = require("./twitchFollower");
var twitchCommands = function (client, discordClient) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        client.on("message", function (channel, tags, message, self) { return __awaiter(void 0, void 0, void 0, function () {
            var args, command, isVIP, isSubscriber, isBroadcaster, isModerator, isPartner, msjSend, userName, isFollower, userPermissions, commandPermissions, allowedCommands, freeComments, msg, userName_1, userId, msg, res, msg, userId, res, msg, models, modelString, msg, responseGPT, error_1;
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (self)
                            return [2 /*return*/]; // ignore messages from the bot itself
                        args = message.slice(1).split(" ");
                        command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                        isVIP = ((_b = tags.badges) === null || _b === void 0 ? void 0 : _b.vip) != null;
                        isSubscriber = ((_c = tags.badges) === null || _c === void 0 ? void 0 : _c.subscriber) != null;
                        isBroadcaster = ((_d = tags.badges) === null || _d === void 0 ? void 0 : _d.broadcaster) != null;
                        isModerator = ((_e = tags.badges) === null || _e === void 0 ? void 0 : _e.moderator) != null;
                        isPartner = ((_f = tags.badges) === null || _f === void 0 ? void 0 : _f.partner) != null;
                        msjSend = message ? message : '';
                        userName = tags.username ? tags.username : '';
                        return [4 /*yield*/, twitchFollower_1.checkIfUserFollows(userName, "fetugamer")];
                    case 1:
                        isFollower = _g.sent();
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, userName + ": " + msjSend)];
                    case 2:
                        _g.sent();
                        return [4 /*yield*/, discordMessageSend_1.sendTwitchFromDiscord(discordClient, client)];
                    case 3:
                        _g.sent();
                        userPermissions = {
                            isVIP: isVIP,
                            isSubscriber: isSubscriber || isFollower,
                            isBroadcaster: isBroadcaster,
                            isModerator: isModerator,
                            isPartner: isPartner
                        };
                        commandPermissions = {
                            free: ['informacion', 'comandos', 'saludo'],
                            premium: ['models', 'gpt', 'registrar', 'puntos'],
                            followerOrHigher: ['registrar', 'puntos'],
                            moderatorOrHigher: ['models', 'gpt', 'registrar', 'puntos']
                        };
                        return [4 /*yield*/, validateCommands_1.validateCommands(command ? command : '', userPermissions, commandPermissions)];
                    case 4:
                        allowedCommands = _g.sent();
                        if (!commandPermissions.free.includes(command ? command : '')) return [3 /*break*/, 7];
                        return [4 /*yield*/, freeCommands_1.getFreeComments(command ? command : '', userName)];
                    case 5:
                        freeComments = _g.sent();
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, freeComments)];
                    case 6:
                        _g.sent();
                        client.say(channel, freeComments);
                        _g.label = 7;
                    case 7:
                        if (!(command === "registrar")) return [3 /*break*/, 13];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 9];
                        msg = "Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 8:
                        _g.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 9:
                        userName_1 = tags.username ? tags.username : '';
                        userId = tags["user-id"] ? tags["user-id"] : '';
                        msg = "Sistema: Registrando usuario...";
                        client.say(channel, msg);
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 10:
                        _g.sent();
                        return [4 /*yield*/, usersControllers_1.createUsers(userName_1, userId)];
                    case 11:
                        res = _g.sent();
                        client.say(channel, "Sistema: " + userName_1 + " " + res);
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "Sistema: " + userName_1 + " " + res)];
                    case 12:
                        _g.sent();
                        _g.label = 13;
                    case 13:
                        if (!(command === "puntos")) return [3 /*break*/, 18];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 15];
                        msg = "Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 14:
                        _g.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 15:
                        userId = tags["user-id"] ? tags["user-id"] : '';
                        return [4 /*yield*/, usersControllers_1.getUserPoints(userId)];
                    case 16:
                        res = _g.sent();
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "Sistema: " + res)];
                    case 17:
                        _g.sent();
                        client.say(channel, "Sistema: " + res);
                        _g.label = 18;
                    case 18:
                        if (!(command === "models")) return [3 /*break*/, 23];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 20];
                        msg = "Lo siento, este comando solo puede ser ejecutado por VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 19:
                        _g.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 20: return [4 /*yield*/, openai_1.getModels()];
                    case 21:
                        models = _g.sent();
                        modelString = models.join(", ");
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "ChatGPT: " + modelString)];
                    case 22:
                        _g.sent();
                        client.say(channel, "ChatGPT: Modelos disponibles > " + modelString);
                        _g.label = 23;
                    case 23:
                        if (!(command === "gpt")) return [3 /*break*/, 30];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 25];
                        msg = "Lo siento, este comando solo puede ser ejecutado por VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 24:
                        _g.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 25:
                        if (!(message.length > 0)) return [3 /*break*/, 30];
                        _g.label = 26;
                    case 26:
                        _g.trys.push([26, 29, , 30]);
                        return [4 /*yield*/, openai_1.run(message)];
                    case 27:
                        responseGPT = _g.sent();
                        //Send discord msg from CHAT GPT
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "ChatGPT: " + responseGPT)];
                    case 28:
                        //Send discord msg from CHAT GPT
                        _g.sent();
                        client.say(channel, "ChatGPT: " + responseGPT);
                        return [3 /*break*/, 30];
                    case 29:
                        error_1 = _g.sent();
                        console.log(error_1);
                        return [3 /*break*/, 30];
                    case 30: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports["default"] = twitchCommands;
