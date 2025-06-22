# 🚀 Coolify Zoo Server Deployment Guide

## 📋 Prerequisites
- Coolify server running on Linux
- Access to Coolify web interface
- GitHub repository with your Minecraft Zoo server code
- Port 19132 available on your server
- Docker and Docker Compose support in Coolify

## 🎯 Step-by-Step Deployment (GitHub/Git-based)

### Step 1: Create New Application in Coolify

1. **Log into your Coolify dashboard**
2. **Navigate to your project**
3. **Click "New Resource" → "Application"**
4. **Choose your Git provider (e.g., GitHub)**
5. **Select your repository** (public or private)
6. **Choose the branch to deploy** (usually `main` or `master`)

### Step 2: Configure the Application

1. **Application Name**: `minecraft-zoo-server`
2. **Description**: `Minecraft Bedrock server with Zoo addon`
3. **Docker Compose**: Use the main `docker-compose.yml` file in the repository
4. **Environment Variables**:
   Set these in Coolify for production:
   ```
   SERVER_NAME=Production Zoo Server
   MAX_PLAYERS=20
   GAMEMODE=creative
   DIFFICULTY=peaceful
   ONLINE_MODE=true
   RCON_PASSWORD=your-secure-password-here
   LEVEL_NAME=super-zoo
   ```

### Step 3: Port Configuration
- **19132/udp** → Minecraft Bedrock server port
- **25575/tcp** → RCON port (for remote administration)

### Step 4: Enable Auto-Deploy
- **Enable auto-deploy on push** so Coolify redeploys your server every time you push a new commit to the selected branch.

### Step 5: Deploy
1. **Click "Deploy"**
2. **Wait for deployment to complete**
3. **Check logs for "Server started"**

## 🎮 Connecting to Your Zoo Server

### From Minecraft Bedrock:
1. **Add Server**
2. **Server Address**: `your-server-ip`
3. **Port**: `19132`
4. **Server Name**: `Zoo Server`

### From Nintendo Switch/iPad:
1. **Play** → **Servers** → **Add Server**
2. **Enter your server details**
3. **Connect and enjoy!**

## 📦 Installing & Updating Your Zoo Addon

### Packaging the Addon
- **After making changes to the add-on code:**
  1. Go to `minecraft-zoo-addon/`
  2. Run:
     ```bash
     npm run build
     npm run package
     ```
  3. This will update the compiled files and the `zoo-addon.mcpack` package.

### Deploying Addon Updates
- **Commit and push your changes to GitHub.**
- **Coolify will automatically redeploy the server with the latest code.**
- If you use Docker volumes for packs, you may still need to copy files as described below.

### Option 1: Volume Mount (Recommended)
1. **Copy addon files** to server volumes:
   ```bash
   # On your Coolify server
   docker cp minecraft-zoo-addon/packs/behavior_pack/ minecraft-zoo-server:/minecraft/behavior_packs/
   docker cp minecraft-zoo-addon/packs/resource_pack/ minecraft-zoo-server:/minecraft/resource_packs/
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
- Test with `telnet your-server-ip 19132`

### Addon Not Loading
- Check behavior_packs and resource_packs directories
- Verify manifest.json files are valid
- Check server logs for addon errors

## 🧪 Testing & Debugging
- Use Coolify's logs to view server output and errors
- Restart the server after updating add-on files
- Test commands and permissions in-game

## 🎯 Next Steps

1. **Deploy the server** using this guide
2. **Install or update the zoo addon** as described above
3. **Test connection** from your devices
4. **Start building** your zoo!
5. **Phase 2**: Implement AI caretakers (see `suggestions.md` for roadmap) 