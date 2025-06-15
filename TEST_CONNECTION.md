# 🎮 Zoo Addon - Connection Test Guide

## ✅ Server Status: RUNNING
Your Minecraft Bedrock server is now running with the Zoo Addon successfully loaded!

## 🔗 Connection Details
- **Server Address**: `localhost` (or your local IP)
- **Port**: `19132`
- **Game Mode**: Creative
- **Difficulty**: Peaceful

## 📱 How to Connect

### From iPad/iPhone:
1. Open Minecraft Bedrock Edition
2. Go to "Play" → "Servers" → "Add Server"
3. Enter:
   - **Server Name**: Super Zoo
   - **Server Address**: `10.0.0.33`
   - **Port**: `19132`

### From Nintendo Switch:
1. Open Minecraft
2. Go to "Play" → "Servers" → "Add Server"
3. Enter the same details as above

### From Computer:
1. Open Minecraft Bedrock Edition (Windows 10/11)
2. Go to "Play" → "Servers" → "Add Server"
3. Enter:
   - **Server Name**: Super Zoo
   - **Server Address**: `localhost`
   - **Port**: `19132`

## 🧪 Testing the Addon

Once connected, the addon will:
1. **Auto-assign visitor role** when you first join
2. **Show welcome messages** with your current role
3. **Run AI caretaker updates** every second (placeholder for now)

### Available Commands (Future):
- `!role` - Check your current role
- `!help` - Show available commands
- `!zoo status` - Check zoo systems

## 🔧 Current Status

### ✅ Working:
- Server running with your actual zoo world
- Addon loaded and initialized
- Permission system active
- AI caretaker system placeholder running
- Config system with default settings

### 🚧 Next Steps:
1. Test connection from your devices
2. Implement actual AI caretaker behaviors
3. Add command handling back (when we figure out stable event APIs)
4. Deploy to Coolify for 24/7 access

## 🐛 Troubleshooting

If you can't connect:
1. Check your firewall settings
2. Make sure you're on the same network
3. Try using your computer's IP address instead of localhost
4. Verify the server is still running: `docker logs super-zoo-server --tail 10`

## 📊 Server Logs
To monitor the server: `docker logs super-zoo-server -f` 