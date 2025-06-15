# 🏗️ Minecraft Zoo Server

This directory contains the Dockerized Minecraft Bedrock server for the Zoo World project, ready for deployment on Coolify or any Docker host.

## 🚀 Quick Start (with Docker Compose)

1. **Edit `coolify-zoo-server.yml` as needed**
   - Set environment variables (server name, max players, etc.)
   - Mount your world and add-on data using Docker volumes or bind mounts

2. **Run with Docker Compose:**
   ```sh
   docker compose -f coolify-zoo-server.yml up -d
   ```

3. **Access the server:**
   - Bedrock clients connect to your server's IP on port `19134` (UDP)
   - AI service (if enabled) will be available on port `8080`

## 📦 World & Add-On Management

- **World Data:**
  - Persisted in the `minecraft-zoo-data` Docker volume (or bind mount)
- **Behavior Packs:**
  - Place your custom packs in the `zoo-behavior-packs` volume or mount
- **Resource Packs:**
  - Place your custom packs in the `zoo-resource-packs` volume or mount

## 🧩 Add-On Development

See [`../minecraft-zoo-addon/README.md`](../minecraft-zoo-addon/README.md) for details on building and packaging the Zoo Add-On.

## 📝 Configuration

- Edit `server.properties` for advanced server settings
- See `coolify-zoo-server.yml` for Docker environment variables

## 🛠️ Useful Commands

- **Start server:**
  ```sh
  docker compose -f coolify-zoo-server.yml up -d
  ```
- **Stop server:**
  ```sh
  docker compose -f coolify-zoo-server.yml down
  ```
- **View logs:**
  ```sh
  docker logs minecraft-zoo-server
  ```

## 🌐 Deployment with Coolify

1. Push this repo to GitHub
2. In Coolify, create a new app and connect to this repo
3. Set the Compose file to `coolify-zoo-server.yml`
4. Configure volumes and environment variables as needed
5. Deploy and enjoy your Zoo World server!

## 🧪 Testing & Debugging

- Use Coolify's logs to view server output and errors
- Restart the server after updating add-on files
- Check that your add-on appears in the behavior/resource packs list in-game
- Test commands and permissions in-game
- If the server or add-on fails to load, check logs for errors and verify your `manifest.json` files 