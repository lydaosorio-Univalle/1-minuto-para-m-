export interface HealthcareThought {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export const HEALTHCARE_THOUGHTS: HealthcareThought[] = [
  {
    id: '1',
    quote: 'Tu valor como profesional no se mide por cuántas horas aguantas sin comer ni beber agua. Cuidarte a ti no es negligencia: es la primera condición para no quebrar.',
    author: 'Reflexión médica de UCI',
    role: 'Terapia Intensiva',
  },
  {
    id: '2',
    quote: 'No eres un sistema infalible ni una máquina de soporte vital. Eres un ser humano con piel, cansancio y un corazón que también necesita reposo.',
    author: 'Enfermería Quirúrgica',
    role: 'Quirófano Central',
  },
  {
    id: '3',
    quote: 'Las fallas del sistema hospitalario, la falta de insumos y la sobreocupación no son tu culpa individual. Haces lo imposible con lo que tienes.',
    author: 'Equipo de Urgencias',
    role: 'Servicio de Emergencias',
  },
  {
    id: '4',
    quote: 'Si hoy sentiste que no pudiste dar más, recuerda: ya diste lo que nadie más pudo estar ahí para dar. Respira hondo.',
    author: 'Cuidado Paliativo y Neonatal',
    role: 'Hospitalización',
  },
  {
    id: '5',
    quote: 'En este minuto, no hay camas que asignar, ni evoluciones que firmar, ni órdenes que revisar. Solo este aire que entra y sale de tu pecho.',
    author: 'Medicina Interna',
    role: 'Guardia de Piso',
  },
  {
    id: '6',
    quote: 'Soltar la guardia un minuto no te hace débil; te permite volver a conectar con la razón profunda por la que elegiste este camino.',
    author: 'Salud Mental y Bienestar Sanitario',
    role: 'Red de Apoyo Clínico',
  },
];
