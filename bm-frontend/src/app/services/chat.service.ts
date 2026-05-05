export async function searchVehicles(message: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL não está definida.');
  }

  const response = await fetch(`${baseUrl}/chat/recomendar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mensagem: message,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao obter resposta do backend.');
  }

  return response.json();
}