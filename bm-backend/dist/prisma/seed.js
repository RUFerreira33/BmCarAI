const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    console.log(' A inserir carros...');
    await prisma.carro.createMany({
        data: [
            {
                marca: 'BMW',
                modelo: 'X1',
                versao: 'sDrive18d',
                titulo: 'BMW X1 sDrive18d Auto',
                preco: 42000,
                ano: 2022,
                quilometros: 15000,
                combustivel: 'Diesel',
                transmissao: 'Automática',
                potenciaCv: 150,
                carrocaria: 'SUV',
                cor: 'Preto',
                portas: 5,
                lugares: 5,
                localizacao: 'Lisboa',
                url: 'https://bmcar.pt/exemplo-x1'
            },
            {
                marca: 'BMW',
                modelo: 'X3',
                versao: 'xDrive20d',
                titulo: 'BMW X3 xDrive20d Auto',
                preco: 55000,
                ano: 2023,
                quilometros: 8000,
                combustivel: 'Diesel',
                transmissao: 'Automática',
                potenciaCv: 190,
                carrocaria: 'SUV',
                cor: 'Branco',
                portas: 5,
                lugares: 5,
                localizacao: 'Porto',
                url: 'https://bmcar.pt/exemplo-x3'
            },
            {
                marca: 'BMW',
                modelo: 'Série 3',
                versao: '320d Touring',
                titulo: 'BMW 320d Touring',
                preco: 39000,
                ano: 2021,
                quilometros: 30000,
                combustivel: 'Diesel',
                transmissao: 'Manual',
                potenciaCv: 190,
                carrocaria: 'Carrinha',
                cor: 'Cinza',
                portas: 5,
                lugares: 5,
                localizacao: 'Braga',
                url: 'https://bmcar.pt/exemplo-320d'
            },
            {
                marca: 'BMW',
                modelo: 'Série 1',
                versao: '118i',
                titulo: 'BMW 118i',
                preco: 29000,
                ano: 2020,
                quilometros: 40000,
                combustivel: 'Gasolina',
                transmissao: 'Manual',
                potenciaCv: 136,
                carrocaria: 'Hatchback',
                cor: 'Vermelho',
                portas: 5,
                lugares: 5,
                localizacao: 'Coimbra',
                url: 'https://bmcar.pt/exemplo-118i'
            }
        ]
    });
    console.log(' Seed concluído');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map