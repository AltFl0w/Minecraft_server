# 🚀 Coolify Zoo Server Deployment Guide

## 📋 Prerequisites
- Coolify server running on Linux
- Access to Coolify web interface
- Ports 19134-19135 available on your server

## 🎯 Step-by-Step Deployment

### Step 1: Create New Service in Coolify

1. **Log into your Coolify dashboard**
2. **Navigate to your project**
3. **Click "New Resource" → "Service"**
4. **Choose "Docker Compose"**

### Step 2: Configure the Service

1. **Service Name**: `minecraft-zoo-server`
2. **Description**: `Clean Minecraft Bedrock server for Zoo addon`
3. **Copy the contents** of `coolify-zoo-server.yml` into the Docker Compose field

### Step 3: Environment Variables (Optional)
Add these if you want to customize:
```
SERVER_NAME=Your Zoo Name
MAX_PLAYERS=20
GAMEMODE=creative
DIFFICULTY=peaceful
```

### Step 4: Port Configuration
- **19134/udp** → Minecraft Bedrock IPv4
- **19135/udp** → Minecraft Bedrock IPv6

### Step 5: Deploy
1. **Click "Deploy"**
2. **Wait for deployment to complete**
3. **Check logs for "Server started"**

## 🎮 Connecting to Your Zoo Server

### From Minecraft Bedrock:
1. **Add Server**
2. **Server Address**: `your-server-ip`
3. **Port**: `19134`
4. **Server Name**: `Zoo Server`

### From Nintendo Switch/iPad:
1. **Play** → **Servers** → **Add Server**
2. **Enter your server details**
3. **Connect and enjoy!**

## 📦 Installing Your Zoo Addon

### Option 1: Volume Mount (Recommended)
1. **Copy addon files** to server volumes:
   ```bash
   # On your Coolify server
   docker cp packs/behavior_pack/ minecraft-zoo-server:/minecraft/behavior_packs/
   docker cp packs/resource_pack/ minecraft-zoo-server:/minecraft/resource_packs/
   ```

### Option 2: Manual Upload
1. **Access server console** through Coolify
2. **Upload addon files** to appropriate directories
3. **Restart server**

## 🔧 Troubleshooting

### Server Won't Start
- Check Coolify logs
- Ensure ports aren't in use
- Verify Docker image is pulling correctly

### Can't Connect
- Check firewall settings
- Verify port forwarding
- Test with `telnet your-server-ip 19134`

### Addon Not Loading
- Check behavior_packs and resource_packs directories
- Verify manifest.json files are valid
- Check server logs for addon errors

## 🎯 Next Steps

1. **Deploy the server** using this guide
2. **Install the zoo addon** we created
3. **Test connection** from your devices
4. **Start building** your zoo!
5. **Phase 2**: Implement AI caretakers 