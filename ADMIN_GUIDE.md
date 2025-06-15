# 🔑 Admin Promotion Guide

## ✅ UPDATED: First Player Auto-Admin System

Your Zoo Addon now has an **automatic admin promotion system**!

## 🎯 How It Works

### First Player = Admin
- **The first player to join the server automatically becomes admin**
- You'll see this message when you join: `§6🎉 Welcome to the Zoo! You are now the ADMIN!`
- All subsequent players will be assigned as "visitor"

### Admin Status Persistence
- Once you're admin, your role is saved
- If the server restarts, you'll still be admin
- The system remembers who the admin is

## 🎮 Testing the System

### Connect to Your Server
- **Server Address**: `10.0.0.33:19132`
- **First to join = Admin!**

### Admin Commands Available
Once you're admin, you can use:
- `!help` - See all available commands
- `!promote <player> <role>` - Promote other players (visitor/builder/admin)
- `!role list` - See all player roles
- `!config show` - View current configuration
- `!ai toggle` - Enable/disable AI caretakers
- `!zoo info` - Show zoo information

### Promoting Other Players
As admin, you can promote others:
```
!promote PlayerName builder    # Make them a builder
!promote PlayerName admin      # Make them an admin too
!promote PlayerName visitor    # Demote to visitor
```

## 🔄 If You Need to Reset Admin
If something goes wrong and you need to reset who's admin:
1. Stop the server: `docker compose -f docker-compose.zoo-world.yml down`
2. The system will automatically make the first player to join admin again

## 🎯 Next Steps
1. **Connect and become admin** - Be the first to join!
2. **Test the commands** - Try `!help` and `!zoo info`
3. **Invite others** - They'll join as visitors, you can promote them
4. **Configure your zoo** - Use `!config zoo name "Your Zoo Name"`

Your zoo is ready for multi-device testing! 🦁🐘🦒 