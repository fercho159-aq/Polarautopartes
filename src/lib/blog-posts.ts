import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'la-importancia-de-la-bomba-de-agua',
    title: 'La Importancia Vital de la Bomba de Agua en tu Motor',
    date: '2024-07-28',
    excerpt: 'La bomba de agua es el corazón del sistema de enfriamiento. Descubre por qué es crucial para la salud de tu motor y cuándo debes reemplazarla.',
    imageUrl: '/Images/WebPolar/Blog/bomba-de-agua-motor.jpg',
    author: {
        name: 'Equipo Polar',
        avatarUrl: '/Images/5.png'
    },
    content: `
      <p>La bomba de agua es uno de los componentes más críticos pero a menudo subestimados del sistema de enfriamiento de un vehículo. Su función principal es hacer circular el refrigerante desde el radiador a través del motor para absorber el calor y luego volver al radiador para disiparlo. Sin este ciclo constante, el motor se sobrecalentaría rápidamente, causando daños severos y costosos.</p>
      <h3 class="font-headline text-xl font-bold mt-6 mb-3">¿Cómo saber si la bomba de agua está fallando?</h3>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Fugas de refrigerante:</strong> Un charco de líquido verdoso o anaranjado debajo de la parte delantera de tu auto es una señal clásica.</li>
        <li><strong>Sobrecalentamiento:</strong> Si la aguja de la temperatura sube constantemente a la zona roja, la bomba podría no estar circulando el refrigerante eficazmente.</li>
        <li><strong>Ruidos extraños:</strong> Un chirrido o rechinido proveniente del área de la bomba indica que el balero interno está desgastado.</li>
      </ul>
      <p>En Polar Autopartes, recomendamos una inspección de la bomba de agua cada vez que se reemplace la banda de tiempo o de accesorios, ya que a menudo comparten la misma área de trabajo y es un buen momento para un reemplazo preventivo. ¡No esperes a que sea demasiado tarde!</p>
    `
  },
  {
    slug: '5-errores-comunes-con-el-anticongelante',
    title: '5 Errores Comunes que Dañan tu Sistema de Enfriamiento',
    date: '2024-07-20',
    excerpt: 'Evita estos 5 errores comunes con el anticongelante que pueden costarte caro a largo plazo. Aprende a cuidar tu sistema de enfriamiento como un profesional.',
    imageUrl: '/Images/WebPolar/Blog/5-errores-comunes.jpg',
    author: {
        name: 'Equipo Polar',
        avatarUrl: '/Images/5.png'
    },
    content: `
      <p>El sistema de enfriamiento es vital, pero muchos conductores cometen errores simples que pueden provocar averías graves. Aquí te presentamos los 5 más comunes:</p>
      <ol class="list-decimal list-inside space-y-3 mt-4">
        <li><strong>Usar agua en lugar de anticongelante:</strong> El agua no tiene las propiedades anticorrosivas ni el punto de ebullición elevado del refrigerante. Causa óxido y sobrecalentamiento.</li>
        <li><strong>Mezclar diferentes tipos de anticongelante:</strong> Mezclar un OAT (orgánico) con un HOAT (híbrido) puede crear una sustancia gelatinosa que obstruye el sistema.</li>
        <li><strong>No cambiarlo nunca:</strong> El refrigerante pierde sus propiedades con el tiempo. No reemplazarlo según las indicaciones del fabricante es una receta para la corrosión y el fallo de componentes.</li>
        <li><strong>Ignorar las fugas pequeñas:</strong> Una pequeña fuga no se arregla sola. Ignorarla llevará a un nivel bajo de refrigerante y a un eventual sobrecalentamiento.</li>
        <li><strong>No purgar el sistema al rellenar:</strong> Dejar aire atrapado en el sistema crea "burbujas" que impiden la correcta circulación del refrigerante y pueden causar puntos calientes en el motor.</li>
      </ol>
      <p class="mt-4">Revisar tu sistema de enfriamiento periódicamente y usar los productos adecuados es la mejor inversión para la longevidad de tu vehículo.</p>
    `
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}
