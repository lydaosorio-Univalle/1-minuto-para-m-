# 1 Minuto Para Mí 🌿

> **Un respiro de 60 segundos diseñado para el personal de salud en UCI, urgencias y turnos quirúrgicos.**  
> *Sin registros, sin evaluaciones, sin métricas invasivas: solo cuida al que cuida.*

---

## 📖 Acerca del Proyecto

**1 Minuto Para Mí** es una aplicación web progresiva y ligera concebida específicamente para médicos, enfermeras, técnicos, terapeutas y todo el equipo sanitario que enfrenta sobrecarga sensorial, fatiga física y estrés agudo en entornos clínicos de alta intensidad.

En solo 60 segundos, ofrece micro-pausas guiadas basadas en fisiología del sistema nervioso autónomo para resetear el tono vagal y aliviar la tensión acumulada.

### 🌟 Características Principales

- **6 Micro-Intervenciones Clínicas de 60s**:
  1. **Respiración 4-7-8**: Activación parasimpática y reducción inmediata del ritmo cardíaco.
  2. **Liberar Cuello y Cervicales**: Descompresión postural tras cirugías o revisión de monitores.
  3. **Bajar la Armadura (Hombros y Pecho)**: Liberación de rigidez tras movilizar pacientes o sostener tensión.
  4. **Descanso de Manos y Muñecas**: Alivio tras horas de guantes, canalizaciones y procedimientos finos.
  5. **Regla 20-20-20 & Ojos**: Descanso visual y reducción de fatiga por pantallas y luces de quirófano.
  6. **Doble Suspiro Fisiológico**: Protocolo respiratorio rápido para frenar picos de adrenalina.
- **Modos de Visualización Clínicos**:
  - **Modo Nocturno / Guardia**: Paleta tenue en tonos pizarra y ámbar suave que protege la adaptación a la oscuridad y no despierta pacientes en rondas de noche.
  - **Modo Alto Contraste**: Para visibilidad nítida bajo tubos fluorescentes de quirófano o luz solar directa.
- **Sonido Sutil Opcional**: Campana tibetana suave sintetizada mediante Web Audio API puro (sin dependencias de archivos externos de audio).
- **100% Privado y Ético**: No solicita contraseñas, no almacena datos de pacientes ni de personal, funciona completamente en el navegador.

---

## 🛠️ Tecnologías

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Motion (Framer Motion)** para animaciones suaves y accesibles
- **Lucide React** para iconografía médica y minimalista
- **Web Audio API** para síntesis sonora relajante sin latencia

---

## 🚀 Instalación y Uso Local

### Prerrequisitos

- **Node.js**: versión 18 o superior
- **npm** o gestor de paquetes de tu preferencia

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/un-minuto-para-mi.git
   cd un-minuto-para-mi
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```
   Los archivos estáticos se generarán en la carpeta `dist/`.

5. **Previsualizar la compilación:**
   ```bash
   npm run preview
   ```

---

## 📋 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo en el puerto 3000 |
| `npm run build` | Compila la aplicación optimizada para producción |
| `npm run preview` | Previsualiza localmente el build de producción |
| `npm run lint` | Valida la consistencia de tipos con TypeScript |
| `npm run clean` | Limpia los artefactos generados en `dist/` |

---

## 🏥 Diseñado con Cuidado

Dedicado a todo el personal de salud que cuida de los demás día a día.
