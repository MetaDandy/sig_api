# ---------- Etapa de build ----------
    FROM node:20-alpine AS builder    # Usa la imagen oficial de Node
    :contentReference[oaicite:0]{index=0}
    WORKDIR /usr/src/app
    
    # Instala dependencias sólo una vez
    COPY package*.json ./
    RUN npm ci --omit=dev                 # más rápido y reproducible
    
    # Copia el resto del código y compila TypeScript → dist/
    COPY . .
    RUN npm run build                     # genera ./dist
    :contentReference[oaicite:1]{index=1}
    
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
    