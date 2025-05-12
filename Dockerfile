# ---------- Etapa de build ----------
    FROM node:20-alpine AS builder 
    
    WORKDIR /usr/src/app
    
    # Instala dependencias sólo una vez
    COPY package*.json ./
    RUN npm ci               
    
    # Copia el resto del código y compila TypeScript → dist/
    COPY . .
    RUN npm run build                    
    
    
    # ---------- Etapa de runtime ----------
    FROM node:20-alpine
    WORKDIR /usr/src/app
    ENV NODE_ENV=production
    
    # Copia solamente lo necesario
    COPY --from=builder /usr/src/app/dist ./dist
    COPY --from=builder /usr/src/app/node_modules ./node_modules
    EXPOSE 3000
    
    # Arranque
    CMD ["node", "dist/main.js"]
    