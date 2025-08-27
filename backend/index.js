const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir peticiones desde cualquier origen
app.use(cors());
app.use(express.json());

// Ruta para obtener evento por ID
app.get('/event/:id', async (req, res) => {
  const eventId = req.params.id;

  const query = `
    query event($id: ID!) {
      event(id: $id) {
        name
        currentScheduleIndex
        fullSchedule {
          podiums {
            heats {
              id
            }
          }
          heatsIntervalSeconds
        }
      }
    }
  `;

  const variables = { id: eventId };

  try {
    const response = await fetch('https://liveheats.com/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al consultar LiveHeats:', error);
    res.status(500).json({ error: 'Error al consultar LiveHeats' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
