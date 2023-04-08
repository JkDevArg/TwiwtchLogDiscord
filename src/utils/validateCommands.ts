interface UserPermissions {
    isVIP: boolean;
    isSubscriber: boolean;
    isBroadcaster: boolean;
    isModerator: boolean;
    isPartner: boolean;
}

interface CommandPermissions {
    free: string[];
    premium: string[];
    followerOrHigher: string[];
    moderatorOrHigher: string[];
}

interface CommandValidationResult {
    hasPermission: boolean;
    userPermissions: UserPermissions;
}

async function validateCommands(command: string, userPermissions: UserPermissions, commandPermissions: CommandPermissions): Promise<CommandValidationResult> {
    if (command) {
        const { free, premium, followerOrHigher, moderatorOrHigher } = commandPermissions;
        const isFreeCommand = free.includes(command.toLowerCase());
        const isPremiumCommand = premium.includes(command.toLowerCase());
        const isFollowerCommand = followerOrHigher.includes(command.toLowerCase()) && userPermissions.isSubscriber;
        const isModeratorCommand = moderatorOrHigher.includes(command.toLowerCase()) && userPermissions.isModerator;

        if (isFreeCommand || isPremiumCommand || isFollowerCommand || isModeratorCommand) {

            if (isFreeCommand) {
                return { hasPermission: true, userPermissions };
            }

            if (isPremiumCommand && (userPermissions.isVIP || userPermissions.isBroadcaster || userPermissions.isModerator || userPermissions.isPartner)) {
                return { hasPermission: true, userPermissions };
            }

            if (isFollowerCommand) {
                return { hasPermission: true, userPermissions };
            }

            if (isModeratorCommand) {
                return { hasPermission: true, userPermissions };
            }
        }
    }
    return { hasPermission: false, userPermissions };
}

export { validateCommands, CommandValidationResult, CommandPermissions, UserPermissions };