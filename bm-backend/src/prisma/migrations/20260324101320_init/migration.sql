-- CreateTable
CREATE TABLE "carros" (
    "id" UUID NOT NULL,
    "bmcar_id" VARCHAR(255),
    "slug" VARCHAR(255),
    "url" TEXT NOT NULL,
    "marca" VARCHAR(100) NOT NULL,
    "modelo" VARCHAR(150),
    "versao" VARCHAR(255),
    "titulo" VARCHAR(255) NOT NULL,
    "tipo_anuncio" VARCHAR(50),
    "preco" DECIMAL(12,2),
    "ano" INTEGER,
    "quilometros" INTEGER,
    "combustivel" VARCHAR(50),
    "transmissao" VARCHAR(50),
    "potencia_cv" INTEGER,
    "cilindrada" INTEGER,
    "traccao" VARCHAR(50),
    "carrocaria" VARCHAR(100),
    "cor" VARCHAR(100),
    "portas" INTEGER,
    "lugares" INTEGER,
    "localizacao" VARCHAR(255),
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "ultima_sincronizacao" TIMESTAMP(3),
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagens_carro" (
    "id" UUID NOT NULL,
    "carro_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "ordem" INTEGER,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "imagens_carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caracteristicas_carro" (
    "id" UUID NOT NULL,
    "carro_id" UUID NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "valor" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "caracteristicas_carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos_chat" (
    "id" UUID NOT NULL,
    "sessao_id" VARCHAR(255),
    "mensagem" TEXT NOT NULL,
    "filtros_extraidos_json" JSONB,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recomendacoes" (
    "id" UUID NOT NULL,
    "pedido_id" UUID NOT NULL,
    "carro_id" UUID NOT NULL,
    "score" DECIMAL(6,2) NOT NULL,
    "justificacao" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recomendacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carros_bmcar_id_key" ON "carros"("bmcar_id");

-- CreateIndex
CREATE UNIQUE INDEX "carros_slug_key" ON "carros"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "carros_url_key" ON "carros"("url");

-- CreateIndex
CREATE INDEX "carros_marca_idx" ON "carros"("marca");

-- CreateIndex
CREATE INDEX "carros_modelo_idx" ON "carros"("modelo");

-- CreateIndex
CREATE INDEX "carros_tipo_anuncio_idx" ON "carros"("tipo_anuncio");

-- CreateIndex
CREATE INDEX "carros_preco_idx" ON "carros"("preco");

-- CreateIndex
CREATE INDEX "carros_ano_idx" ON "carros"("ano");

-- CreateIndex
CREATE INDEX "carros_quilometros_idx" ON "carros"("quilometros");

-- CreateIndex
CREATE INDEX "carros_combustivel_idx" ON "carros"("combustivel");

-- CreateIndex
CREATE INDEX "carros_transmissao_idx" ON "carros"("transmissao");

-- CreateIndex
CREATE INDEX "carros_carrocaria_idx" ON "carros"("carrocaria");

-- CreateIndex
CREATE INDEX "carros_cor_idx" ON "carros"("cor");

-- CreateIndex
CREATE INDEX "carros_ativo_idx" ON "carros"("ativo");

-- CreateIndex
CREATE INDEX "imagens_carro_carro_id_idx" ON "imagens_carro"("carro_id");

-- CreateIndex
CREATE INDEX "caracteristicas_carro_carro_id_idx" ON "caracteristicas_carro"("carro_id");

-- CreateIndex
CREATE INDEX "pedidos_chat_sessao_id_idx" ON "pedidos_chat"("sessao_id");

-- CreateIndex
CREATE INDEX "recomendacoes_pedido_id_idx" ON "recomendacoes"("pedido_id");

-- CreateIndex
CREATE INDEX "recomendacoes_carro_id_idx" ON "recomendacoes"("carro_id");

-- AddForeignKey
ALTER TABLE "imagens_carro" ADD CONSTRAINT "imagens_carro_carro_id_fkey" FOREIGN KEY ("carro_id") REFERENCES "carros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caracteristicas_carro" ADD CONSTRAINT "caracteristicas_carro_carro_id_fkey" FOREIGN KEY ("carro_id") REFERENCES "carros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recomendacoes" ADD CONSTRAINT "recomendacoes_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos_chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recomendacoes" ADD CONSTRAINT "recomendacoes_carro_id_fkey" FOREIGN KEY ("carro_id") REFERENCES "carros"("id") ON DELETE CASCADE ON UPDATE CASCADE;
