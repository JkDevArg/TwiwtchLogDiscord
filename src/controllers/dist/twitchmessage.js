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
var twitchCommands = function (client, discordClient) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        client.on("message", function (channel, tags, message, self) { return __awaiter(void 0, void 0, void 0, function () {
            var args, command, isVIP, isSubscriber, isFollower, isBroadcaster, isModerator, isPartner, msjSend, userName, userPermissions, commandPermissions, allowedCommands, msg, msg, msg, models, modelString, msg, userName_1, userId, msg, res, msg, userId, res, msg, responseGPT, error_1;
            var _a, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (self)
                            return [2 /*return*/]; // ignore messages from the bot itself
                        args = message.slice(1).split(" ");
                        command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                        isVIP = ((_b = tags.badges) === null || _b === void 0 ? void 0 : _b.vip) != null;
                        isSubscriber = ((_c = tags.badges) === null || _c === void 0 ? void 0 : _c.subscriber) != null;
                        isFollower = ((_d = tags.badges) === null || _d === void 0 ? void 0 : _d.founder) != null;
                        isBroadcaster = ((_e = tags.badges) === null || _e === void 0 ? void 0 : _e.broadcaster) != null;
                        isModerator = ((_f = tags.badges) === null || _f === void 0 ? void 0 : _f.moderator) != null;
                        isPartner = ((_g = tags.badges) === null || _g === void 0 ? void 0 : _g.partner) != null;
                        msjSend = message ? message : '';
                        userName = tags.username ? tags.username : '';
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, userName + ": " + msjSend)];
                    case 1:
                        _h.sent();
                        return [4 /*yield*/, discordMessageSend_1.sendTwitchFromDiscord(discordClient, client)];
                    case 2:
                        _h.sent();
                        userPermissions = {
                            isVIP: isVIP,
                            isSubscriber: isSubscriber,
                            isFollower: isFollower,
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
                    case 3:
                        allowedCommands = _h.sent();
                        if (!allowedCommands) return [3 /*break*/, 30];
                        if (command === "saludo") {
                            client.say(channel, "Hola @" + tags.username + "!");
                        }
                        if (!(command === "informacion")) return [3 /*break*/, 5];
                        msg = "Hola @" + tags.username + "! actualmente el sistema esta en BETA y pronto se podr\u00E1 usar los puntos para cambiar por articulos o regalos!, puedes entrar a mi discord para mas novedades https://discord.gg/QzaB7sm2";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 4:
                        _h.sent();
                        client.say(channel, msg);
                        _h.label = 5;
                    case 5:
                        if (!(command === "comandos")) return [3 /*break*/, 7];
                        msg = "Hola @" + tags.username + "! estos son los comandos: !models - !gpt - !registrar - !puntos -";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 6:
                        _h.sent();
                        client.say(channel, msg);
                        _h.label = 7;
                    case 7:
                        if (!(command === "models")) return [3 /*break*/, 12];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 9];
                        msg = "Sistema: Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 8:
                        _h.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 9: return [4 /*yield*/, openai_1.getModels()];
                    case 10:
                        models = _h.sent();
                        modelString = models.join(", ");
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "ChatGPT: " + modelString)];
                    case 11:
                        _h.sent();
                        client.say(channel, "ChatGPT: Modelos disponibles > " + modelString);
                        _h.label = 12;
                    case 12:
                        if (!(command === "registrar")) return [3 /*break*/, 18];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 14];
                        msg = "Sistema: Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 13:
                        _h.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 14:
                        userName_1 = tags.username ? tags.username : '';
                        userId = tags["user-id"] ? tags["user-id"] : '';
                        msg = "Sistema: Registrando usuario...";
                        client.say(channel, msg);
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 15:
                        _h.sent();
                        return [4 /*yield*/, usersControllers_1.createUsers(userName_1, userId)];
                    case 16:
                        res = _h.sent();
                        client.say(channel, "Sistema: " + userName_1 + " " + res);
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "Sistema: " + userName_1 + " " + res)];
                    case 17:
                        _h.sent();
                        _h.label = 18;
                    case 18:
                        if (!(command === "puntos")) return [3 /*break*/, 23];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 20];
                        msg = "Sistema: Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 19:
                        _h.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 20:
                        userId = tags["user-id"] ? tags["user-id"] : '';
                        return [4 /*yield*/, usersControllers_1.getUserPoints(userId)];
                    case 21:
                        res = _h.sent();
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "Sistema: " + res)];
                    case 22:
                        _h.sent();
                        client.say(channel, "Sistema: " + res);
                        _h.label = 23;
                    case 23:
                        if (!(command === "gpt")) return [3 /*break*/, 30];
                        if (!!allowedCommands.hasPermission) return [3 /*break*/, 25];
                        msg = "Sistema: Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.";
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, msg)];
                    case 24:
                        _h.sent();
                        client.say(channel, msg);
                        return [2 /*return*/];
                    case 25:
                        if (!(message.length > 0)) return [3 /*break*/, 30];
                        _h.label = 26;
                    case 26:
                        _h.trys.push([26, 29, , 30]);
                        return [4 /*yield*/, openai_1.run(message)];
                    case 27:
                        responseGPT = _h.sent();
                        //Send discord msg from CHAT GPT
                        return [4 /*yield*/, discordMessageSend_1.discordChatMessage(discordClient, "ChatGPT: " + responseGPT)];
                    case 28:
                        //Send discord msg from CHAT GPT
                        _h.sent();
                        client.say(channel, "ChatGPT: " + responseGPT);
                        return [3 /*break*/, 30];
                    case 29:
                        error_1 = _h.sent();
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
