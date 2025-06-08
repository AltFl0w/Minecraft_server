import { Player, world } from '@minecraft/server';

export type PlayerRole = 'admin' | 'builder' | 'visitor';

export interface PermissionConfig {
    canBuild: boolean;
    canDestroy: boolean;
    canUseTNT: boolean;
    canManagePermissions: boolean;
    canConfigureAI: boolean;
    canAccessAdminCommands: boolean;
}

export class PermissionManager {
    private playerRoles: Map<string, PlayerRole> = new Map();
    
    private rolePermissions: Record<PlayerRole, PermissionConfig> = {
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

    constructor() {
        this.loadPermissions();
    }

    setPlayerRole(player: Player, role: PlayerRole): void {
        this.playerRoles.set(player.id, role);
        this.savePermissions();
        player.sendMessage(`§aYour role has been set to: §b${role}`);
    }

    getPlayerRole(player: Player): PlayerRole {
        return this.playerRoles.get(player.id) || 'visitor';
    }

    hasPermissions(player: Player): boolean {
        return this.playerRoles.has(player.id);
    }

    canPlayerPerformAction(player: Player, action: keyof PermissionConfig): boolean {
        const role = this.getPlayerRole(player);
        return this.rolePermissions[role][action];
    }

    getAllPlayersWithRole(role: PlayerRole): Player[] {
        const players: Player[] = [];
        for (const [playerId, playerRole] of this.playerRoles) {
            if (playerRole === role) {
                const player = world.getAllPlayers().find(p => p.id === playerId);
                if (player) players.push(player);
            }
        }
        return players;
    }

    private loadPermissions(): void {
        // TODO: Load from world storage when available
        // For now, use in-memory storage
        console.log('§ePermission system initialized');
    }

    private savePermissions(): void {
        // TODO: Save to world storage when available
        // For now, use in-memory storage
    }

    // Admin commands
    promotePlayer(admin: Player, targetPlayerName: string, newRole: PlayerRole): boolean {
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

    listPlayerRoles(admin: Player): void {
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