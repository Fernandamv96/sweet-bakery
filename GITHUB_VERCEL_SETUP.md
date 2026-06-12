# 🎀 Sweet Bakery - Comandos para GitHub y Vercel

## 📋 Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Crea un nuevo repositorio llamado: `sweet-bakery`
3. **NO** inicialices con README (ya lo tenemos localmente)
4. Haz clic en "Create repository"

## 📦 Paso 2: Conectar Repositorio Local con GitHub

```powershell
# En tu terminal, desde la carpeta del proyecto:
cd "c:\Users\eddis\Downloads\pasteleria\sweet-bakery\sweet-bakery"

# Agregar el repositorio remoto (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/sweet-bakery.git

# Renombrar rama a 'main' (opcional, pero recomendado)
git branch -M main

# Hacer push al repositorio remoto
git push -u origin main
```

## 🚀 Paso 3: Deployar en Vercel

### Opción A: Usando la CLI de Vercel (Recomendado)

```powershell
# Desde la carpeta del proyecto:
vercel

# Te pedirá que:
# 1. Conectes tu cuenta de Vercel (abre el navegador)
# 2. Selecciones el proyecto (crea uno nuevo)
# 3. Confirmes la configuración del build
```

### Opción B: Conectar GitHub a Vercel (Más fácil después)

1. Ve a https://vercel.com
2. Inicia sesión o regístrate
3. Haz clic en "New Project"
4. Selecciona "Import Git Repository"
5. Busca tu repositorio `sweet-bakery`
6. Haz clic en "Import"
7. Vercel detectará automáticamente que es un proyecto Vite
8. Haz clic en "Deploy"

## 🔄 Paso 4: Hacer Cambios y Actualizar

Cada vez que hagas cambios:

```powershell
# 1. Agregar cambios
git add .

# 2. Hacer commit
git commit -m "Descripción de los cambios"

# 3. Hacer push a GitHub
git push

# Vercel se actualizará automáticamente 🎉
```

## ✅ Comandos Útiles

```powershell
# Ver estado del repositorio
git status

# Ver historial de commits
git log --oneline

# Ver repositorio remoto
git remote -v

# Hacer push sin -u (después de la primera vez)
git push

# Deploy desde CLI de Vercel
vercel --prod
```

## 🌐 URLs después del Deploy

- **GitHub**: https://github.com/TU_USUARIO/sweet-bakery
- **Vercel**: https://sweet-bakery-[TU_USERNAME].vercel.app

## 📝 Resumen Rápido

1. ✅ Repositorio Git local creado
2. ✅ Vercel CLI instalado
3. 📍 Crea repositorio en GitHub
4. 📍 Conecta con: `git remote add origin ...`
5. 📍 Haz push: `git push -u origin main`
6. 📍 Deploy en Vercel: `vercel`
7. 🎉 ¡Tu app está en internet!
