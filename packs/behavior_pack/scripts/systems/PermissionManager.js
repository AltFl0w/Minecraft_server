import { world } from '@minecraft/server';
export class PermissionManager {
    constructor() {
        this.playerRoles = new Map();
        this.rolePermissions = {
            admin: {
                canBuild: true,
                canDestroy: true,
                canUseTNT: true,
                canManagePermissions: true,
                canConfigureAI: true,
                canAccessAdminCommands: true
            },
            builder: {
                canBuild: true,
                canDestroy: false,
                canUseTNT: false,
                canManagePermissions: false,
                canConfigureAI: false,
                canAccessAdminCommands: false
            },
            visitor: {
                canBuild: false,
                canDestroy: false,
                canUseTNT: false,
                canManagePermissions: false,
                canConfigureAI: false,
                canAccessAdminCommands: false
            }
        };
        this.loadPermissions();
    }
    setPlayerRole(player, role) {
        this.playerRoles.set(player.id, role);
        this.savePermissions();
        player.sendMessage(`§aYour role has been set to: §b${role}`);
    }
    getPlayerRole(player) {
        return this.playerRoles.get(player.id) || 'visitor';
    }
    hasPermissions(player) {
        return this.playerRoles.has(player.id);
    }
    canPlayerPerformAction(player, action) {
        const role = this.getPlayerRole(player);
        return this.rolePermissions[role][action];
    }
    getAllPlayersWithRole(role) {
        const players = [];
        for (const [playerId, playerRole] of this.playerRoles) {
            if (playerRole === role) {
                const player = world.getAllPlayers().find(p => p.id === playerId);
                if (player)
                    players.push(player);
            }
        }
        return players;
    }
    loadPermissions() {
        // TODO: Load from world storage when available
        // For now, use in-memory storage
        console.log('§ePermission system initialized');
    }
    savePermissions() {
        // TODO: Save to world storage when available
        // For now, use in-memory storage
    }
    // Admin commands
    promotePlayer(admin, targetPlayerName, newRole) {
        if (!this.canPlayerPerformAction(admin, 'canManagePermissions')) {
            admin.sendMessage('§cYou do not have permission to manage player roles!');
            return false;
        }
        const targetPlayer = world.getAllPlayers().find(p => p.name === targetPlayerName);
        if (!targetPlayer) {
            admin.sendMessage(`§cPlayer "${targetPlayerName}" not found!`);
            return false;
        }
        this.setPlayerRole(targetPlayer, newRole);
        admin.sendMessage(`§aPromoted ${targetPlayerName} to ${newRole}`);
        return true;
    }
    listPlayerRoles(admin) {
        if (!this.canPlayerPerformAction(admin, 'canManagePermissions')) {
            admin.sendMessage('§cYou do not have permission to view player roles!');
            return;
        }
        admin.sendMessage('§e=== Player Roles ===');
        for (const player of world.getAllPlayers()) {
            const role = this.getPlayerRole(player);
            admin.sendMessage(`§b${player.name}: §a${role}`);
        }
    }
}
