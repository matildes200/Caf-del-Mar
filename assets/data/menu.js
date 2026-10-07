/* Café del Mar: full menu (Carta).
   Source: the restaurant's FineDine menu, extracted from its API on 2026-10-05.
   Edit prices here: "value" is the amount exactly as listed (e.g. 10500 is shown as 10,500).
   "tags" and "allergens" use the keys defined in "labels" below. */
window.CDM_MENU = {
  "intro": "Bem-vindo ao Café del Mar. Com mais de 20 anos de actividade, o Café Del Mar é um espaço icónico da cidade de Luanda situado no ponto final da Ilha de Luanda.",
  "labels": {
    "tags": { "new": "Novo", "signature": "Prato exclusivo", "seasonal": "Sazonal" },
    "allergens": { "gluten": "Glúten", "laktose": "Lactose", "egg": "Ovo", "molluscs": "Moluscos", "seafood": "Frutos do mar", "pork": "Porco", "sugar": "Açúcar", "spicy": "Apimentado", "fish": "Peixe" }
  },
  "sections": [
    {
      "name": "Almoço/ Jantar",
      "description": "Uma seleção cuidadosamente elaborada de pratos deliciosos, que prometem uma experiência gastronômica memorável no conforto do nosso restaurante.",
      "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
      "items": [
      ],
      "sections": [
        {
          "name": "Entradas",
          "description": "Seleção de entradas frescas e saborosas para começar a sua refeição",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Pipocas de frango com molho barbecue", "description": "[Bolinhas de peito de frango panadas com molho barbecue]", "prices": [{ "label": "", "value": 10500 }], "tags": ["new"], "allergens": ["gluten", "laktose", "egg"] },
            { "name": "Carpaccio de polvo", "description": "[Finas fatias cozidas de polvo, com pimentos, limão e óleo de sésamo]", "prices": [{ "label": "", "value": 12000 }], "tags": ["new"], "allergens": ["molluscs"] },
            { "name": "Gyosas de aves e legumes", "description": "[Legumes, aves, malagueta, molho oriental e agridoce]", "prices": [{ "label": "", "value": 13000 }], "tags": ["new"], "allergens": ["gluten"] },
            { "name": "Pica-pau de novilho", "description": "[Cubos de novilho em molho à portuguesa e pickles]", "prices": [{ "label": "", "value": 14000 }], "tags": ["signature"], "allergens": ["laktose"] },
            { "name": "Choco frito", "description": "[Cubos de choco frito com molho tártaro e molho de maracujá]", "prices": [{ "label": "", "value": 15000 }], "tags": ["signature"], "allergens": ["molluscs", "gluten", "egg"] },
            { "name": "Ceviche de peixe branco", "description": "[Malagueta, lima, cebola roxa, gengibre, flor de sal, nuvens de arroz]", "prices": [{ "label": "", "value": 15500 }], "tags": ["new"], "allergens": [] },
            { "name": "Carpaccio de novilho premium", "description": "[Finas fatias cruas marinadas em azeite e limão, alcaparras, queijo Grana Padano]", "prices": [{ "label": "", "value": 17500 }], "tags": ["signature"], "allergens": [] },
            { "name": "Gambas ao alho", "description": "[Gambas salteadas em azeite e alho]", "prices": [{ "label": "", "value": 24500 }], "tags": ["signature"], "allergens": ["seafood", "laktose"] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Saladas",
          "description": "Variedade de saladas frescas e coloridas, preparadas com ingredientes de qualidade para uma refeição leve e saudável",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Salada simples", "description": "[Alface, tomate, milho, cebola, pepino, cenoura, azeitona, sementes de sésamo]", "prices": [{ "label": "", "value": 8500 }], "tags": [], "allergens": [] },
            { "name": "Salada de couscous marroquino e mamão", "description": "[Couscous, grão de bico tostado, tomate, mamão, molho de iogurte com alho e cebolinho]", "prices": [{ "label": "", "value": 14000 }], "tags": [], "allergens": ["gluten", "laktose"] },
            { "name": "Poke bowl de atum marinado", "description": "[Atum fresco marinado, ananás, quinoa, pickles de melancia, abacate]", "prices": [{ "label": "", "value": 17000 }], "tags": [], "allergens": [] },
            { "name": "Salada de frango panado e beringela gratinada", "description": "[Alface, manjericão, maçã e mamão, frango panado em ginguba, beringela gratinada com vinagrete balsamico]", "prices": [{ "label": "", "value": 18500 }], "tags": [], "allergens": ["laktose"] },
            { "name": "Salada mexicana", "description": "[Alface, carne, abacate, milho, feijão, tomate, pepino, salsa, cebola]", "prices": [{ "label": "", "value": 19000 }], "tags": ["new"], "allergens": [] },
            { "name": "Transparência de camarões em vinagrete", "description": "[Alface, ananás e mamão, com espetada de camarões grelhados em molho vinagrete de côco e açafrão]", "prices": [{ "label": "", "value": 20000 }], "tags": [], "allergens": ["seafood"] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Vegetariano",
          "description": "Opções criativas e nutritivas para os amantes de uma alimentação à base de vegetais",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Nasi goreng", "description": "[Ovo estrelado, arroz, cenoura, courgette, pimentos coloridos, molho de ostra e molho de soja]", "prices": [{ "label": "", "value": 12000 }], "tags": ["new"], "allergens": ["gluten", "egg", "seafood"] },
            { "name": "Caril de legumes", "description": "[Jardineira de legumes, leite de coco, caril, arroz aromatizado, e molho chutney]", "prices": [{ "label": "", "value": 14500 }], "tags": [], "allergens": ["gluten", "laktose"] },
            { "name": "Bibimbap vegetariano", "description": "[Arroz, cogumelos naturais, legumes, repolho verde e roxo, sementes de sésamo e ovo]", "prices": [{ "label": "", "value": 16500 }], "tags": ["signature"], "allergens": ["egg", "gluten"] },
            { "name": "Poke bowl vegan", "description": "[Cubos batata rena, feijão verde, quiabos, cogumelos e  pickles de melancia]", "prices": [{ "label": "", "value": 18000 }], "tags": [], "allergens": [] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Massas",
          "description": "Pratos reconfortantes e saborosos, com uma variedade de molhos e acompanhamentos",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Pasta de pollo", "description": "[Peito de frango, molho de tomate, alho, limão e manjericão]", "prices": [{ "label": "", "value": 15500 }], "tags": ["signature"], "allergens": ["gluten"] },
            { "name": "Pasta à brasileira", "description": "[Tiras de picanha, mescla de legumes e cogumelos envolvidos por uma infusão de molho de soja e vinho chinês]", "prices": [{ "label": "", "value": 19500 }], "tags": [], "allergens": ["gluten"] },
            { "name": "Gambaretti", "description": "[Molho carbonara de camarão e bacon com gema de ovo]", "prices": [{ "label": "", "value": 24500 }], "tags": ["signature"], "allergens": ["gluten", "laktose", "seafood", "egg"] },
            { "name": "Pasta de lagosta", "description": "[Lagosta salteada, tomate, vinho branco, azeite e alho]", "prices": [{ "label": "", "value": 29000 }], "tags": ["signature"], "allergens": ["gluten", "seafood", "laktose"] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Peixes",
          "description": "Pratos frescos e saborosos do mar, preparados de forma a destacar os sabores naturais.",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Peixe do dia grelhado", "description": "[Consultar peixes disponíveis]", "prices": [{ "label": "", "value": 14500 }], "tags": [], "allergens": [] },
            { "name": "Lulas à petisqueira", "description": "[Lulas salteadas, molho cremoso, batata rena e legumes]", "prices": [{ "label": "", "value": 15500 }], "tags": ["new"], "allergens": [] },
            { "name": "Bitoque de atum", "description": "[Atum, ovo estrelado, chips de batata doce e salada]", "prices": [{ "label": "", "value": 16500 }], "tags": ["new"], "allergens": [] },
            { "name": "Choco grelhado", "description": "", "prices": [{ "label": "", "value": 19500 }], "tags": [], "allergens": [] },
            { "name": "Polvo braseado", "description": "", "prices": [{ "label": "", "value": 20500 }], "tags": [], "allergens": [] },
            { "name": "Bacalhau à Brás", "description": "[Batata palha caseira, ovos, bacalhau desfiado, azeite, cebola alho salsa, azeitonas]", "prices": [{ "label": "", "value": 20000 }], "tags": ["new"], "allergens": [] },
            { "name": "Tranche de peixe com cebola", "description": "[Tranche de peixe branco grelhada com batata rena e legumes]", "prices": [{ "label": "", "value": 21000 }], "tags": ["signature"], "allergens": [] },
            { "name": "Espetada Del Mar", "description": "[Espetada de peixe e choco grelhada, legumes e molho de ananás]", "prices": [{ "label": "", "value": 22000 }], "tags": ["signature"], "allergens": [] },
            { "name": "Tataki de atum", "description": "[Atum envolto em sementes de sésamo com puré de banana pão, legumes salteados, tomate e molho de limão]", "prices": [{ "label": "", "value": 22500 }], "tags": [], "allergens": [] },
            { "name": "Caril de peixe e choco", "description": "[Arroz branco aromatizado com canela e chutney de tomate, ananás, gindungo]", "prices": [{ "label": "", "value": 23500 }], "tags": [], "allergens": ["laktose", "gluten"] },
            { "name": "Risoto di gamberi & cogumelos", "description": "[Camarão, cogumelos, natas, queijo e consomê de camarão aromatizado com coentros]", "prices": [{ "label": "", "value": 29000 }], "tags": [], "allergens": ["gluten", "laktose"] },
            { "name": "Caril de lagosta", "description": "[Arroz branco aromatizado e chutney de tomate, ananás, gindungo]", "prices": [{ "label": "", "value": 30500 }], "tags": [], "allergens": ["gluten", "laktose"] },
            { "name": "Gambas grelhadas", "description": "[Batata frita, legumes salteados e molho cítrico]", "prices": [{ "label": "", "value": 35000 }], "tags": [], "allergens": [] },
            { "name": "Arroz de peixe com marisco (dose para 2 pessoas)", "description": "[Arroz envolvido com pedaços de peixe e camarão, amêijoas, fumê de peixe e finalizado com coentros]", "prices": [{ "label": "", "value": 42000 }], "tags": [], "allergens": ["gluten"] },
            { "name": "Grelhada mista do mar (dose para 2 pessoas)", "description": "[Tranche de peixe branco, gambas, polvo, choco, legumes salteados, batata rena ou batata doce, gomo de limão e ervas aromáticas]", "prices": [{ "label": "", "value": 47500 }], "tags": [], "allergens": [] },
            { "name": "Lagosta grelhada", "description": "[Batata frita, salada mista e molho cítrico]", "prices": [{ "label": "", "value": 55000 }], "tags": [], "allergens": [] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Carnes",
          "description": "Suculentas e bem temperadas, para os apreciadores de uma boa carne.",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Espetada de frango", "description": "[Peito de frango com arroz de enchidos, cenoura, soja e molho de limão e mel]", "prices": [{ "label": "", "value": 17000 }], "tags": [], "allergens": ["laktose", "gluten"] },
            { "name": "Surf and turf", "description": "[Lombinho de porco assado com camarão e arroz basmati aromatizado, tomate cherry molho de gengibre, pimentos e pimentão doce, molho soja, alho]", "prices": [{ "label": "", "value": 18500 }], "tags": ["new"], "allergens": ["pork", "seafood"] },
            { "name": "Mix de carnes", "description": "[Secretos de porco preto, bife de bovino, peito de frango]", "prices": [{ "label": "", "value": 20500 }], "tags": [], "allergens": [] },
            { "name": "Magret de pato com molho de laranja", "description": "[Peito de pato assado, arroz basmati, bacon e cebolinhas assadas]", "prices": [{ "label": "", "value": 21500 }], "tags": ["signature"], "allergens": ["pork"] },
            { "name": "Naco de filet mignon", "description": "", "prices": [{ "label": "", "value": 24500 }], "tags": [], "allergens": [] },
            { "name": "Picanha", "description": "[Fatias de picanha grelhadas, arroz, banana frita, feijão preto, couve mineira, farofa e salada de legumes picados]", "prices": [{ "label": "", "value": 26500 }], "tags": ["signature"], "allergens": ["pork", "gluten", "egg"] },
            { "name": "Tagliata de carne com massa trufada", "description": "[Picanha fatiada com massa ao molho de queijo, cogumelos e azeite de trufas]", "prices": [{ "label": "", "value": 30000 }], "tags": ["new"], "allergens": ["laktose", "gluten"] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Sobremesas",
          "description": "Tentadoras criações doces para finalizar a sua refeição com um toque de indulgência.",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Prato de fruta", "description": "[Consultar frutas disponíveis]", "prices": [{ "label": "", "value": 5500 }], "tags": [], "allergens": [] },
            { "name": "Mousse de maracujá", "description": "[Creme de maracujá natural]", "prices": [{ "label": "", "value": 10000 }], "tags": ["signature"], "allergens": ["laktose", "sugar"] },
            { "name": "Tartelete de limão", "description": "[Massa quebrada, creme de limão e merengue italiano]", "prices": [{ "label": "", "value": 10000 }], "tags": ["new"], "allergens": [] },
            { "name": "Apple crumble", "description": "[Maçã cozida, canela e crumble caseiro com gelado de nata]", "prices": [{ "label": "", "value": 11500 }], "tags": ["signature"], "allergens": ["laktose", "gluten", "sugar"] },
            { "name": "Crepe Suzette", "description": "[Crepe flambado com licor, laranja e açúcar caramelizado com gelado de caxinde]", "prices": [{ "label": "", "value": 12000 }], "tags": ["new"], "allergens": [] },
            { "name": "Cookie de chocolate com gelado", "description": "[Bolacha húmida com pepitas de chocolate com gelado à escolha] [Tempo médio de confecção entre 15/20 minutos]", "prices": [{ "label": "", "value": 13000 }], "tags": ["new"], "allergens": [] },
            { "name": "Cheesecake", "description": "[Biscoito, creme de queijo e molho à escolha: maracujá ou frutos vermelhos]", "prices": [{ "label": "", "value": 13500 }], "tags": ["signature"], "allergens": ["laktose", "gluten"] },
            { "name": "Pavê", "description": "[Bolo em camadas de brownie de chocolate negro e mousse de chocolate branco com ganache e frutos vermelhos]", "prices": [{ "label": "", "value": 13500 }], "tags": [], "allergens": ["laktose", "sugar", "gluten"] },
            { "name": "Petit gateau \"a bomba\"", "description": "[Bolo recheado de chocolate, gelado de nata]", "prices": [{ "label": "", "value": 14500 }], "tags": ["signature"], "allergens": ["laktose", "gluten", "egg", "sugar"] }
          ],
          "sections": [
          ]
        }
      ]
    },
    {
      "name": "Snacks",
      "description": "Deliciosas opções de petiscos leves e saborosos, perfeitos para acompanhar momentos de relaxamento e diversão à beira-mar ou nos nossos confortáveis lounges.",
      "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
      "items": [
      ],
      "sections": [
        {
          "name": "Snacks/ Finger food",
          "description": "Opções deliciosas e leves para satisfazer o seu apetite",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Pipocas de frango com molho barbecue", "description": "[Bolinhas de peito de frango panadas com molho barbecue]", "prices": [{ "label": "", "value": 10500 }], "tags": ["new"], "allergens": ["gluten", "laktose", "egg"] },
            { "name": "Ovos rotos", "description": "", "prices": [{ "label": "", "value": 11500 }], "tags": ["new"], "allergens": [] },
            { "name": "Pão bao com barriga de porco", "description": "[Pão bao com barriga de porco ao molho barbecue]", "prices": [{ "label": "", "value": 13500 }], "tags": ["new"], "allergens": ["pork", "gluten"] },
            { "name": "Pica-pau de novilho", "description": "[Cubos de novilho em molho à portuguesa e pickles]", "prices": [{ "label": "", "value": 14000 }], "tags": ["signature"], "allergens": ["laktose"] },
            { "name": "Choco frito", "description": "[Cubos de choco frito com molho tártaro e molho de maracujá]", "prices": [{ "label": "", "value": 15000 }], "tags": ["signature"], "allergens": ["molluscs", "gluten", "egg"] },
            { "name": "Camarão panko", "description": "", "prices": [{ "label": "", "value": 15500 }], "tags": ["new"], "allergens": [] },
            { "name": "Carpaccio de novilho premium", "description": "[Finas fatias cruas marinadas em azeite e limão, alcaparras, queijo Grana Padano]", "prices": [{ "label": "", "value": 17500 }], "tags": ["signature"], "allergens": [] },
            { "name": "Gambas ao alho", "description": "[Gambas salteadas em azeite e alho]", "prices": [{ "label": "", "value": 24500 }], "tags": ["signature"], "allergens": ["seafood", "laktose"] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Saladas/ Vegetariano",
          "description": "Variedade de saladas frescas e coloridas, preparadas com ingredientes de qualidade para uma refeição leve e saudável",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Salada de couscous marroquino e mamão", "description": "[Couscous, grão de bico tostado, tomate, mamão, molho de iogurte com alho e cebolinho]", "prices": [{ "label": "", "value": 14000 }], "tags": [], "allergens": ["gluten", "laktose"] },
            { "name": "Bibimbap vegetariano", "description": "[Arroz, cogumelos naturais, legumes, repolho verde e roxo, sementes de sésamo e ovo]", "prices": [{ "label": "", "value": 16500 }], "tags": ["signature"], "allergens": [] },
            { "name": "Poke bowl de atum marinado", "description": "[Atum fresco marinado, ananás, quinoa, pickles de melancia, abacate]", "prices": [{ "label": "", "value": 17000 }], "tags": [], "allergens": [] },
            { "name": "Salada de frango panado e beringela gratinada", "description": "[Alface, manjericão, maçã e mamão, frango panado em ginguba, beringela gratinada com vinagrete balsamico]", "prices": [{ "label": "", "value": 18500 }], "tags": [], "allergens": ["laktose"] },
            { "name": "Salada Mexicana", "description": "", "prices": [{ "label": "", "value": 19000 }], "tags": [], "allergens": [] },
            { "name": "Transparência de camarões em vinagrete", "description": "[Alface, ananás e mamão, com espetada de camarões grelhados em molho vinagrete de côco e açafrão]", "prices": [{ "label": "", "value": 20000 }], "tags": [], "allergens": ["seafood"] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Pizzas/ Calzone",
          "description": "Deliciosas pizzas preparadas com os melhores ingredientes e assadas à perfeição.",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Margherita", "description": "[Molho de tomate, tomate, mozzarella, manjericão]", "prices": [{ "label": "Normal", "value": 17000 }], "tags": ["signature"], "allergens": ["gluten", "laktose"] },
            { "name": "Sapore di pollo", "description": "[Molho de tomate, frango, ananás, milho]", "prices": [{ "label": "Normal", "value": 18500 }], "tags": [], "allergens": ["gluten", "laktose"] },
            { "name": "Jovanela", "description": "[Molho de tomate, fiambre, chouriço]", "prices": [{ "label": "Normal", "value": 19000 }], "tags": [], "allergens": ["gluten", "pork", "laktose"] },
            { "name": "Diavola Picante", "description": "[Molho de tomate, carne bolonhesa, cebola, milho, picante]", "prices": [{ "label": "Normal", "value": 20500 }], "tags": [], "allergens": ["gluten", "laktose", "spicy"] },
            { "name": "Al tonno", "description": "[Molho de tomate, atum, cebola, tomate, azeitona]", "prices": [{ "label": "Normal", "value": 21000 }], "tags": [], "allergens": ["gluten", "laktose"] },
            { "name": "Del Mar", "description": "[Molho de tomate, molho de marisco, camarões, pimentos, coentros]", "prices": [{ "label": "Normal", "value": 22500 }], "tags": [], "allergens": ["gluten", "laktose", "fish"] },
            { "name": "Filetto", "description": "[Molho tomate, picanha, chouriço, cogumelos, ovo]", "prices": [{ "label": "Normal", "value": 25000 }], "tags": [], "allergens": ["gluten", "egg", "laktose", "pork"] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Tostas/ Hamburgueres/ Pregos",
          "description": "Combinações de sanduíches irresistíveis, desde tostas crocantes a hambúrgueres suculentos e pregos saborosos.",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Torrada", "description": "[Torrada de pão saloio com manteiga]", "prices": [{ "label": "", "value": 4500 }], "tags": [], "allergens": ["gluten", "laktose"] },
            { "name": "Tosta de queijo ou fiambre", "description": "[Tosta de queijo ou fiambre prensada]", "prices": [{ "label": "", "value": 8000 }], "tags": [], "allergens": ["gluten", "laktose", "pork"] },
            { "name": "Tosta mista", "description": "[Tosta de queijo e fiambre prensada]", "prices": [{ "label": "", "value": 10000 }], "tags": [], "allergens": ["gluten", "laktose", "pork"] },
            { "name": "Tosta de atum", "description": "[Tosta de atum prensada]", "prices": [{ "label": "", "value": 10000 }], "tags": [], "allergens": ["gluten", "fish", "egg"] },
            { "name": "Sandwich club", "description": "[Tosta, frango, bacon, tomate, alface, maionese]", "prices": [{ "label": "", "value": 12500 }], "tags": [], "allergens": ["gluten", "laktose", "pork", "egg"] },
            { "name": "Hamburguer de frango", "description": "", "prices": [{ "label": "", "value": 13500 }], "tags": [], "allergens": ["gluten", "laktose", "pork"] },
            { "name": "Prego no pão de novilho", "description": "", "prices": [{ "label": "", "value": 14500 }], "tags": ["signature"], "allergens": ["gluten", "laktose"] },
            { "name": "Prego no prato de novilho", "description": "", "prices": [{ "label": "", "value": 16500 }], "tags": [], "allergens": ["gluten", "laktose", "egg"] },
            { "name": "Cheeseburger", "description": "", "prices": [{ "label": "", "value": 17000 }], "tags": ["signature"], "allergens": ["gluten", "laktose", "pork"] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Omeletes",
          "description": "Opção ideal para um café da manhã ou uma refeição leve a qualquer hora do dia",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Omelete simples", "description": "", "prices": [{ "label": "", "value": 7000 }], "tags": [], "allergens": ["egg"] },
            { "name": "Omelete de fiambre, queijo ou legumes", "description": "", "prices": [{ "label": "", "value": 10500 }], "tags": [], "allergens": ["egg", "laktose", "pork"] },
            { "name": "Omelete mista", "description": "", "prices": [{ "label": "", "value": 11000 }], "tags": [], "allergens": ["egg", "laktose", "pork"] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Pecados",
          "description": "Tentadoras criações doces para finalizar a sua refeição com um toque de indulgência.",
          "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
          "items": [
            { "name": "Mousse de maracujá", "description": "[Creme de maracujá natural]", "prices": [{ "label": "", "value": 10000 }], "tags": ["signature"], "allergens": ["laktose", "sugar"] },
            { "name": "Tartelete de limão", "description": "", "prices": [{ "label": "", "value": 10000 }], "tags": ["new"], "allergens": [] },
            { "name": "Apple crumble", "description": "[Maçã cozida, canela e crumble caseiro com gelado de nata]", "prices": [{ "label": "", "value": 11500 }], "tags": ["signature"], "allergens": ["laktose", "gluten", "sugar"] },
            { "name": "Crepe Suzette", "description": "", "prices": [{ "label": "", "value": 12000 }], "tags": ["new"], "allergens": [] },
            { "name": "Cheesecake", "description": "[Biscoito, creme de queijo e molho à escolha: maracujá ou frutos vermelhos]", "prices": [{ "label": "", "value": 13500 }], "tags": ["signature"], "allergens": ["laktose", "gluten"] },
            { "name": "Pavê", "description": "[Bolo em camadas de brownie de chocolate negro e mousse de  chocolate branco com ganache e frutos vermelhos]", "prices": [{ "label": "", "value": 13500 }], "tags": [], "allergens": ["laktose", "sugar", "gluten"] },
            { "name": "Petit gateau \"a bomba\"", "description": "[Bolo recheado de chocolate, gelado de nata]", "prices": [{ "label": "", "value": 14500 }], "tags": ["signature"], "allergens": ["laktose", "gluten", "sugar", "egg"] }
          ],
          "sections": [
          ]
        }
      ]
    },
    {
      "name": "Brunch",
      "description": "Uma seleção deliciosa e variada de pratos que combinam o melhor do pequeno-almoço e do almoço.",
      "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
      "items": [
        { "name": "Panqueca doce", "description": "[Escolha: açúcar e canela, leite condensado, chocolate quente, fruta, compota ou mel]", "prices": [{ "label": "", "value": 8000 }], "tags": [], "allergens": ["gluten", "laktose", "sugar"] },
        { "name": "Iogurte com granola caseira", "description": "[Iogurte natural, frutas da época, granola e mel]", "prices": [{ "label": "", "value": 8500 }], "tags": [], "allergens": ["laktose", "gluten"] },
        { "name": "Tosta aberta de omelete e chourição", "description": "[Fatia de pão integral, ovo, alho e chourição]", "prices": [{ "label": "", "value": 9000 }], "tags": [], "allergens": ["gluten", "laktose", "egg", "pork"] },
        { "name": "Bru﻿schetta de ovo e bacon picado", "description": "[Pão saloio, creme de queijo fresco, abacate, bacon picado e ovo escalfado]", "prices": [{ "label": "", "value": 9500 }], "tags": ["new"], "allergens": ["laktose", "gluten", "egg", "pork"] },
        { "name": "Panque﻿ca de abacate, ovo e bacon", "description": "[Panqueca, abacate, ovo estrelado e bacon]", "prices": [{ "label": "", "value": 9500 }], "tags": [], "allergens": ["laktose", "gluten", "egg", "pork"] },
        { "name": "Waffles com fruta e gelado", "description": "[Frutas da época, mel e gelado à escolha]", "prices": [{ "label": "", "value": 10000 }], "tags": ["new"], "allergens": ["laktose", "egg", "gluten", "sugar"] },
        { "name": "Crepioca co﻿m frango grelhado", "description": "[Crepioca, frango grelhado, bacon, alface e hummus]", "prices": [{ "label": "", "value": 10500 }], "tags": ["new"], "allergens": ["laktose", "egg", "pork"] },
        { "name": "Quesadi﻿llas com ovos mexidos e chouriço", "description": "[Tortillas, ovos mexidos, chouriço e molho ranch]", "prices": [{ "label": "", "value": 10500 }], "tags": ["new"], "allergens": ["gluten", "laktose", "egg", "pork"] },
        { "name": "Ovos benedict co﻿m bacon", "description": "[Ovos escalfados, bacon, torradas e molho holandês]", "prices": [{ "label": "", "value": 11000 }], "tags": ["new"], "allergens": ["gluten", "laktose", "egg"] },
        { "name": "Waffles de queijo﻿ e bacon caramelizado", "description": "[Waffles salgados de queijo, ovos mexidos, abacate e bacon caramelizado]", "prices": [{ "label": "", "value": 11500 }], "tags": ["new"], "allergens": ["gluten", "laktose", "pork", "egg"] },
        { "name": "Shaks﻿huka com pão naan de alho", "description": "[Molho de tomate com especiarias, pão naan de alho e ovos]", "prices": [{ "label": "", "value": 12500 }], "tags": ["new"], "allergens": ["gluten", "egg", "laktose"] },
        { "name": "Prato d﻿e pequeno almoço", "description": "[Ovo à escolha, bacon, salsicha, tomate, batata, cogumelos, fiambre, queijo, iogurte, brioche, pão miniatura, manteiga, compota, bolo do dia, fruta da época, chá ou leite ou compal néctar e café]", "prices": [{ "label": "", "value": 19000 }], "tags": ["signature"], "allergens": ["gluten", "laktose", "egg", "pork", "sugar"] },
        { "name": "Tábua de﻿ brunch (﻿miniaturas) - 2 pess.", "description": "[Pão bao de porco, fritatta de legumes e queijo, crepioca de frango, sandes salada de atum, tosta de omelete e chouriço, salada couscous, muesli ou iogurte natural, espetada de ananás, crepioca de banana e aveia, panqueca doce com calda de frutas]", "prices": [{ "label": "", "value": 29000 }], "tags": ["signature"], "allergens": [] }
      ],
      "sections": [
      ]
    },
    {
      "name": "Bebidas",
      "description": "",
      "note": "Taxa de IVA incluído - Acréscimo de 1,000 Akzs para Lounge VIP e Take-Away",
      "items": [
      ],
      "sections": [
        {
          "name": "Aperitivos",
          "description": "",
          "note": "",
          "items": [
            { "name": "Campari", "description": "", "prices": [{ "label": "", "value": 5500 }], "tags": [], "allergens": [] },
            { "name": "Pastis", "description": "", "prices": [{ "label": "", "value": 7000 }], "tags": [], "allergens": [] },
            { "name": "Limoncello", "description": "", "prices": [{ "label": "", "value": 8000 }], "tags": ["new"], "allergens": [] },
            { "name": "Martini's", "description": "", "prices": [{ "label": "", "value": 9500 }], "tags": [], "allergens": [] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Cocktails",
          "description": "",
          "note": "",
          "items": [
            { "name": "Cocktail do mês", "description": "[consulte funcionário]", "prices": [{ "label": "", "value": 8500 }], "tags": ["seasonal"], "allergens": [] }
          ],
          "sections": [
            {
              "name": "Criações Café del Mar",
              "description": "",
              "note": "",
              "items": [
                { "name": "Suavidade (Mocktail)", "description": "[Sumos de limão, pitaya, maracujá, laranja, ananas e açucar]", "prices": [{ "label": "", "value": 7000 }], "tags": [], "allergens": [] },
                { "name": "Cocolemon (Mocktail)", "description": "[Limão, leite coco, mirtillos, hortelã]", "prices": [{ "label": "", "value": 8000 }], "tags": [], "allergens": [] },
                { "name": "Luna", "description": "[Gin rosé, triple sec, água tónica, s.limão, s.laranja, maracujá, pepino, morango, hortelã, açúcar]", "prices": [{ "label": "", "value": 9500 }], "tags": ["new"], "allergens": [] },
                { "name": "Amazing", "description": "[Vodka maçã, triple sec, sumo de limão, hortelã, maçã, açúcar]", "prices": [{ "label": "", "value": 9500 }], "tags": ["new"], "allergens": [] },
                { "name": "Exótico", "description": "[Vodka, Triple sec, bols maracujá, pitaia,s.maracujá, s.laranja,morango e açucar]", "prices": [{ "label": "", "value": 10000 }], "tags": [], "allergens": [] },
                { "name": "Ombaka", "description": "[Rum, licor beirão, s. laranja, s.limão, maracujá, ananás, açúcar]", "prices": [{ "label": "", "value": 10000 }], "tags": ["new"], "allergens": [] },
                { "name": "Love", "description": "[Gin rosé, licor caramelo, s.limão, maracujá, batata doce, frutos vermelhos, açúcar]", "prices": [{ "label": "", "value": 10000 }], "tags": ["new"], "allergens": [] },
                { "name": "Lovoka Passion", "description": "[Licor beirão, vodka, frutos vermelhos, maracujá, banana]", "prices": [{ "label": "", "value": 10500 }], "tags": ["signature"], "allergens": [] },
                { "name": "Mwana Pwo", "description": "[Frutos vermelhos, maracujá, creme de múcua, whisky, triple sec]", "prices": [{ "label": "", "value": 11000 }], "tags": ["signature"], "allergens": [] }
              ],
              "sections": [
              ]
            },
            {
              "name": "Clássicos",
              "description": "",
              "note": "",
              "items": [
                { "name": "Caipirinha/ Caipiroska", "description": "[Cachaça ou vodka, açúcar, lima ou maracujá ou mucua ou ananas]", "prices": [{ "label": "", "value": 8000 }], "tags": [], "allergens": [] },
                { "name": "Daiquiri", "description": "[Rum, sumo de fruta, açúcar]", "prices": [{ "label": "", "value": 8500 }], "tags": [], "allergens": [] },
                { "name": "Piña Colada", "description": "[Rum, sumo ananás, batida de coco]", "prices": [{ "label": "", "value": 8500 }], "tags": [], "allergens": [] },
                { "name": "Negroni", "description": "[Gin gordons, martini rosso, Campari]", "prices": [{ "label": "", "value": 9500 }], "tags": [], "allergens": [] },
                { "name": "Porto Tónico", "description": "[Porto seco, água tónica, hortelã, limão]", "prices": [{ "label": "", "value": 10000 }], "tags": [], "allergens": [] },
                { "name": "Mojito", "description": "[Rum, lima, açúcar, hortelã]", "prices": [{ "label": "", "value": 10500 }], "tags": [], "allergens": [] },
                { "name": "Margarita", "description": "[Tequilla, triple sec, sumo de limão]", "prices": [{ "label": "", "value": 10500 }], "tags": [], "allergens": [] },
                { "name": "Mimosa", "description": "[Sumo de laranja, Espumante]", "prices": [{ "label": "", "value": 12000 }], "tags": [], "allergens": [] },
                { "name": "Aperol", "description": "[Aperol, Espumante, água com gás]", "prices": [{ "label": "", "value": 17500 }], "tags": [], "allergens": [] }
              ],
              "sections": [
              ]
            }
          ]
        },
        {
          "name": "Sangrias",
          "description": "",
          "note": "",
          "items": [
            { "name": "Cerveja", "description": "[Vodka de citrinos, laranja, lima, polpa de maracujá, cerveja, sprite]", "prices": [{ "label": "", "value": 20500 }], "tags": [], "allergens": [] },
            { "name": "Vinho tinto", "description": "[Vinho tinto, vodka, licor beirão, sprite e frutas]", "prices": [{ "label": "", "value": 26500 }], "tags": [], "allergens": [] },
            { "name": "Vinho branco", "description": "[Vinho branco, vodka, licor beirão, sprite e frutas]", "prices": [{ "label": "", "value": 28500 }], "tags": [], "allergens": [] },
            { "name": "Coconuts", "description": "[Vodka, espumante e frutos vermelhos]", "prices": [{ "label": "", "value": 36500 }], "tags": ["signature"], "allergens": [] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Champagnes",
          "description": "",
          "note": "",
          "items": [
            { "name": "Muum Cordon Rouge Brut", "description": "França", "prices": [{ "label": "75 cl", "value": 215000 }], "tags": [], "allergens": [] },
            { "name": "Moët Chandon Brut Impérial", "description": "França", "prices": [{ "label": "75 cl", "value": 240000 }], "tags": [], "allergens": [] },
            { "name": "Moët Chandon Brut Impérial Rosé", "description": "França", "prices": [{ "label": "75 cl", "value": 250000 }], "tags": [], "allergens": [] },
            { "name": "Moët Chandon Nectar Impérial", "description": "França", "prices": [{ "label": "75 cl", "value": 264500 }], "tags": [], "allergens": [] },
            { "name": "Moët Chandon Impérial Ice", "description": "França", "prices": [{ "label": "75 cl", "value": 287500 }], "tags": [], "allergens": [] },
            { "name": "Veuve Clicquot Brut", "description": "", "prices": [{ "label": "", "value": 290000 }], "tags": ["new"], "allergens": [] },
            { "name": "Perrier Jouet Brut", "description": "França", "prices": [{ "label": "75 cl", "value": 359500 }], "tags": [], "allergens": [] },
            { "name": "Ruinart Blanc de Blancs", "description": "", "prices": [{ "label": "", "value": 480000 }], "tags": ["new"], "allergens": [] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Espumantes/ Proseccos/ Moscatos",
          "description": "",
          "note": "",
          "items": [
            { "name": "Blanc de Blancs", "description": "Bacio Della Luna - Itália", "prices": [{ "label": "75 cl", "value": 25500 }], "tags": [], "allergens": [] },
            { "name": "Espumante Mateus Rosé Brut", "description": "Douro - Portugal", "prices": [{ "label": "75 cl", "value": 28500 }], "tags": [], "allergens": [] },
            { "name": "Voga Pinot Grigio Rosé", "description": "Enoitalia - Itália", "prices": [{ "label": "75 cl", "value": 38500 }], "tags": [], "allergens": [] },
            { "name": "Moscato Premium Cavatina", "description": "Cavatina - Itália", "prices": [{ "label": "75 cl", "value": 40000 }], "tags": [], "allergens": [] },
            { "name": "JP Chenet Divine Gold Demi-sec", "description": "França", "prices": [{ "label": "75 cl", "value": 50500 }], "tags": [], "allergens": [] },
            { "name": "Veuve Moisans Brut", "description": "Vale do Loite - França", "prices": [{ "label": "75 cl", "value": 52000 }], "tags": [], "allergens": [] },
            { "name": "JP Chenet 24 Carat Gold Brut Blanc de Blancs", "description": "França", "prices": [{ "label": "", "value": 55500 }], "tags": [], "allergens": [] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Espirituosas",
          "description": "",
          "note": "",
          "items": [
          ],
          "sections": [
            {
              "name": "Gin",
              "description": "",
              "note": "",
              "items": [
                { "name": "Gordons", "description": "", "prices": [{ "label": "", "value": 8000 }], "tags": [], "allergens": [] },
                { "name": "Gordons Rosé", "description": "", "prices": [{ "label": "", "value": 8000 }], "tags": [], "allergens": [] },
                { "name": "Beefeater", "description": "", "prices": [{ "label": "", "value": 10000 }], "tags": [], "allergens": [] },
                { "name": "Beefeater Pink", "description": "", "prices": [{ "label": "", "value": 10000 }], "tags": [], "allergens": [] },
                { "name": "Kianda Rosé", "description": "", "prices": [{ "label": "", "value": 14000 }], "tags": [], "allergens": [] },
                { "name": "Maruvo", "description": "", "prices": [{ "label": "", "value": 14000 }], "tags": [], "allergens": [] },
                { "name": "Inverroche Classic | Verdant", "description": "", "prices": [{ "label": "", "value": 18500 }], "tags": [], "allergens": [] },
                { "name": "Bulldog", "description": "", "prices": [{ "label": "", "value": 19000 }], "tags": [], "allergens": [] },
                { "name": "Hendricks", "description": "", "prices": [{ "label": "", "value": 25000 }], "tags": [], "allergens": [] },
                { "name": "G'Vine Floraison", "description": "", "prices": [{ "label": "", "value": 25000 }], "tags": [], "allergens": [] }
              ],
              "sections": [
              ]
            },
            {
              "name": "Vodka",
              "description": "",
              "note": "",
              "items": [
                { "name": "Absolut Elyx", "description": "", "prices": [{ "label": "", "value": 8500 }], "tags": [], "allergens": [] },
                { "name": "Ciroc", "description": "", "prices": [{ "label": "", "value": 10000 }], "tags": [], "allergens": [] },
                { "name": "Belvedere", "description": "", "prices": [{ "label": "", "value": 16500 }], "tags": [], "allergens": [] }
              ],
              "sections": [
              ]
            },
            {
              "name": "Tequila",
              "description": "",
              "note": "",
              "items": [
                { "name": "Jose Cuervo", "description": "", "prices": [{ "label": "", "value": 6500 }], "tags": [], "allergens": [] },
                { "name": "Casamigos Añejo", "description": "", "prices": [{ "label": "Shot", "value": 18000 }, { "label": "Garrafa", "value": 325000 }], "tags": [], "allergens": [] },
                { "name": "Clase Azul Reposado", "description": "", "prices": [{ "label": "Shot", "value": 45000 }, { "label": "Garrafa", "value": 845000 }], "tags": [], "allergens": [] }
              ],
              "sections": [
              ]
            },
            {
              "name": "Rum",
              "description": "",
              "note": "",
              "items": [
                { "name": "Captain Morgan", "description": "", "prices": [{ "label": "", "value": 5000 }], "tags": [], "allergens": [] },
                { "name": "Havana Club 3", "description": "", "prices": [{ "label": "", "value": 6500 }], "tags": [], "allergens": [] },
                { "name": "Bacardi", "description": "", "prices": [{ "label": "", "value": 6500 }], "tags": [], "allergens": [] }
              ],
              "sections": [
              ]
            }
          ]
        },
        {
          "name": "Shots",
          "description": "",
          "note": "",
          "items": [
            { "name": "Vodka", "description": "", "prices": [{ "label": "", "value": 4000 }], "tags": [], "allergens": [] },
            { "name": "Rum", "description": "", "prices": [{ "label": "", "value": 4000 }], "tags": [], "allergens": [] },
            { "name": "Cachaça", "description": "", "prices": [{ "label": "", "value": 4000 }], "tags": [], "allergens": [] },
            { "name": "B52", "description": "[Baileys, licor de café, triple sec]", "prices": [{ "label": "", "value": 5000 }], "tags": [], "allergens": [] },
            { "name": "Angola on Fire", "description": "[Groselha, tia maria, absinto]", "prices": [{ "label": "", "value": 5000 }], "tags": [], "allergens": [] },
            { "name": "Danos cerebrais", "description": "[Vodka, creme de cacau, batida de coco, gold strike]", "prices": [{ "label": "", "value": 5000 }], "tags": [], "allergens": [] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Whiskey",
          "description": "",
          "note": "",
          "items": [
          ],
          "sections": [
            {
              "name": "Blends",
              "description": "",
              "note": "",
              "items": [
                { "name": "Johnnie Walker Red", "description": "Scotch - Novo", "prices": [{ "label": "", "value": 6000 }], "tags": [], "allergens": [] },
                { "name": "Jameson", "description": "Irish - Novo", "prices": [{ "label": "", "value": 6500 }], "tags": [], "allergens": [] },
                { "name": "Jack Daniels", "description": "Tennesse", "prices": [{ "label": "", "value": 8500 }], "tags": [], "allergens": [] },
                { "name": "Chivas 12 Anos", "description": "Scotch - 12 anos", "prices": [{ "label": "", "value": 8500 }], "tags": [], "allergens": [] },
                { "name": "Jameson Black barrel", "description": "Irish - 12 anos", "prices": [{ "label": "", "value": 9000 }], "tags": [], "allergens": [] },
                { "name": "Johnnie Walker Black", "description": "Scotch - 12 anos", "prices": [{ "label": "", "value": 9500 }], "tags": [], "allergens": [] },
                { "name": "Johnnie Walker Gold", "description": "Scotch - 18 anos", "prices": [{ "label": "", "value": 22000 }], "tags": [], "allergens": [] },
                { "name": "Johnnie Walker Blue", "description": "Scotch - 21 anos", "prices": [{ "label": "", "value": 65000 }], "tags": [], "allergens": [] }
              ],
              "sections": [
              ]
            },
            {
              "name": "Malt",
              "description": "",
              "note": "",
              "items": [
                { "name": "Glenmorangie Original 12 Anos", "description": "Scotch - 12 anos", "prices": [{ "label": "", "value": 12000 }], "tags": [], "allergens": [] },
                { "name": "Glenmorangie La Santa 12 Anos", "description": "Scotch - 12 anos", "prices": [{ "label": "", "value": 17500 }], "tags": [], "allergens": [] },
                { "name": "Glenmorangie Quinta Ruban 14 Anos", "description": "Scotch - 14 anos", "prices": [{ "label": "", "value": 20500 }], "tags": [], "allergens": [] },
                { "name": "Macallan Amber", "description": "Scotch - 18 anos", "prices": [{ "label": "", "value": 30000 }], "tags": [], "allergens": [] },
                { "name": "Glenmorangie Extremely Rare", "description": "Scotch - 18 anos", "prices": [{ "label": "", "value": 43000 }], "tags": [], "allergens": [] }
              ],
              "sections": [
              ]
            }
          ]
        },
        {
          "name": "Cognacs/ Aguardentes Velhas/ Brandies",
          "description": "",
          "note": "",
          "items": [
            { "name": "Brandy", "description": "", "prices": [{ "label": "", "value": 5000 }], "tags": [], "allergens": [] },
            { "name": "Chancella", "description": "", "prices": [{ "label": "", "value": 6000 }], "tags": [], "allergens": [] },
            { "name": "Antiqua", "description": "", "prices": [{ "label": "", "value": 7000 }], "tags": [], "allergens": [] },
            { "name": "CRF", "description": "", "prices": [{ "label": "", "value": 8500 }], "tags": [], "allergens": [] },
            { "name": "Martel VSOP", "description": "", "prices": [{ "label": "", "value": 17000 }], "tags": [], "allergens": [] },
            { "name": "Remy Martin VSOP", "description": "", "prices": [{ "label": "", "value": 26000 }], "tags": [], "allergens": [] },
            { "name": "Remy Martin XO", "description": "", "prices": [{ "label": "", "value": 76500 }], "tags": [], "allergens": [] }
          ],
          "sections": [
          ]
        },
        {
          "name": "Licor",
          "description": "",
          "note": "",
          "items": [
            { "name": "Licor Beirão", "description": "", "prices": [{ "label": "", "value": 9000 }], "tags": [], "allergens": [] },
            { "name": "Amarula", "description": "", "prices": [{ "label": "", "value": 7500 }], "tags": [], "allergens": [] },
            { "name": "Tia Maria", "description": "", "prices": [{ "label": "", "value": 18500 }], "tags": [], "allergens": [] },
            { "name": "Cointreau", "description": "", "prices": [{ "label": "", "value": 18500 }], "tags": [], "allergens": [] }
          ],
          "sections": [
          ]
        }
      ]
    }
  ]
};
