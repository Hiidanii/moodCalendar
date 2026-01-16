# 🧠 Mood Calendar

Aplicación web para registrar y visualizar el **estado de ánimo diario** a lo largo del año, organizada por meses, usando **solo frontend** y **localStorage**.

---

## 🎯 Idea principal

La app permite guardar, para **cada día del año**:

* Un **mood** (estado de ánimo)
* Una lista de **tags** representados únicamente con **emojis**

El objetivo es ofrecer una forma **visual, simple y rápida** de llevar un seguimiento emocional y detectar patrones con el paso del tiempo.

---

## 📅 Funcionamiento general

* La app muestra un **calendario mensual** del mes actual.
* El usuario puede navegar entre **todos los meses del año**.
* Cada día puede tener:

  * 1 mood
  * 0 o más tags

---

## 😀 Moods

Escala emocional fija (de mayor a menor):

1. 😄 **Muy feliz**
2. 🙂 **Feliz**
3. 😌 **Tranquilo**
4. 😐 **Neutral**
5. 😣 **Estresado**
6. 😢 **Triste**

### Propiedades de cada mood

Cada mood tiene asociado:

* Un **emoji**
* Un **color** (usado en calendario y gráficas)
* Un **valor numérico** interno (para estadísticas)

Ejemplo conceptual:

* Muy feliz → 😄 → Verde
* Feliz → 🙂 → Verde claro
* Tranquilo → 😌 → Azul
* Neutral → 😐 → Gris
* Estresado → 😣 → Naranja
* Triste → 😢 → Rojo

---

## 🏷️ Tags

* Los tags sirven para **contextualizar el día**.
* Se representan **solo con emojis** (sin texto).
* Son reutilizables.

Ejemplos de tags:

* 🏋️‍♂️ (gym)
* 📚 (estudiar)
* 👥 (amigos)
* 🎮 (videojuegos)
* 🛌🏼 (poco sueño)
* ☀️ / 🌧️ (clima)

> Recomendación: máximo **3–5 tags por día**.

---

## 💾 Almacenamiento

* Todos los datos se guardan en **localStorage**.
* ❌ No hay backend
* ❌ No hay base de datos
* ❌ No hay inicio de sesión

Esto simplifica el desarrollo y hace que la app sea:

* Rápida
* Offline
* Ideal como proyecto personal o académico

---

## 🧱 Estructura de datos (conceptual)

```ts
export type MoodType = "😄" | "🙂" | "😌" | "😐" | "😣" | "😢";

export interface MoodEntry {
  date: string;   // YYYY-MM-DD
  mood: MoodType;
  tags: string[]; // Emojis
}
```

Los datos se agrupan por meses dentro de `localStorage`.

---

## 📊 Estadísticas y gráficas

La app usa **Chart.js** para mostrar estadísticas basadas en los datos guardados:

* 📈 Evolución del mood a lo largo del mes
* 🍩 Distribución de moods por mes
* 📊 Frecuencia de tags
* 📅 Mood medio mensual

Las gráficas se generan **exclusivamente a partir de datos de localStorage**.

---

## 🖥️ Pantallas principales

* 📅 Calendario mensual
* 🎭 Selector de mood y tags (emojis)
* 📊 Dashboard de estadísticas

---

## 🛠️ Tecnologías

* **Framework:** Angular 21
* **Lenguaje:** TypeScript
* **Vistas:** HTML + CSS
* **Gráficas:** Chart.js
* **Almacenamiento:** localStorage

---

## 🧩 Arquitectura

* Aplicación **solo frontend**
* Lógica centralizada en **servicios Angular**
* Componentes desacoplados del sistema de almacenamiento

Esto permite que, en el futuro, se pueda añadir un backend sin reescribir toda la app.
