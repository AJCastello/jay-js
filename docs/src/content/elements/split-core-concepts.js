import { readFile, writeFile, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Define the mapping of sections to their respective names and filenames
// Each section includes complete metadata for the output file

const baseFrontmatter = {
  category: 'Core Concepts',
  categoryId: 2
};

const sections = [
  {
    name: '1. Filosofia de Design Headless',
    metadata: {
      ...baseFrontmatter,
      slug: 'core-concepts-headless-design-philosophy',
      title: 'Filosofia de Design Headless',
      description: 'O conceito headless no @jay-js/elements, benefícios da separação entre funcionalidade e apresentação visual, e exemplos de flexibilidade na implementação.'
    }
  },
  {
    name: '2. A Função Base como Fundação',
    metadata: {
      ...baseFrontmatter,
      slug: 'core-concepts-base-function-foundation',
      title: 'A Função Base como Fundação',
      description: 'Como a função Base funciona como bloco de construção central, processo de criação e configuração de propriedades, manipulação de eventos e gerenciamento de estilos.'
    }
  },
  {
    name: '3. Gerenciamento de Ciclo de Vida com Custom Elements',
    metadata: {
      ...baseFrontmatter,
      slug: 'core-concepts-lifecycle-management-custom-elements',
      title: 'Gerenciamento de Ciclo de Vida com Custom Elements',
      description: 'Implementação de onmount/onunmount com padrões web, registro de custom elements, connectedCallback e disconnectedCallback, e melhores práticas para gerenciamento de memória.'
    }
  },
  {
    name: '4. Sistema de Children Baseado em Promises',
    metadata: {
      ...baseFrontmatter,
      slug: 'core-concepts-promise-based-children-system',
      title: 'Sistema de Children Baseado em Promises',
      description: 'Carregamento assíncrono de conteúdo, exemplos com fetch, timeouts e renderização condicional, suporte para conteúdo misto e estados de carregamento.'
    }
  },
  {
    name: '5. Integração com TypeScript e Type Safety',
    metadata: {
      ...baseFrontmatter,
      slug: 'core-concepts-typescript-integration-type-safety',
      title: 'Integração com TypeScript e Type Safety',
      description: 'Funções de componente genéricos, herança de propriedades de elementos HTML, tipagem de event handlers e referências, e tipos customizados para extensibilidade.'
    }
  },
  {
    name: '6. Sistema de Referências',
    metadata: {
      ...baseFrontmatter,
      slug: 'core-concepts-references-system',
      title: 'Sistema de Referências',
      description: 'API useRef e padrões de uso, acesso direto ao DOM, integração com eventos de lifecycle e melhores práticas para utilização de referências.'
    }
  },
  {
    name: '7. Padrões de Manipulação de Eventos',
    metadata: {
      ...baseFrontmatter,
      slug: 'core-concepts-event-handling-patterns',
      title: 'Padrões de Manipulação de Eventos',
      description: 'Propriedades de evento diretas, objeto listeners para cenários complexos, event delegation, eventos customizados e padrões avançados como debounce e composition.'
    }
  },
  {
    name: '8. Considerações de Performance',
    metadata: {
      ...baseFrontmatter,
      slug: 'core-concepts-performance-considerations',
      title: 'Considerações de Performance',
      description: 'Impacto de zero dependências, manipulação nativa do DOM, padrões de re-renderização eficiente, gerenciamento de memória e otimizações avançadas.'
    }
  }
];

// Resolve __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the core concepts file
const currentFilePath = join(__dirname, 'core-concepts.md');

// Function to split and create new files based on the mapping
function splitFile() {
  // Check if the source file exists
  if (!existsSync(currentFilePath)) {
    console.error(`Source file does not exist: ${currentFilePath}`);
    return;
  }

  readFile(currentFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${currentFilePath}`, err);
      return;
    }

    // Create section markers by adding the indices to the data
    let sectionMarkers = [];

    // Create an array of headings to look for in the document
    // Procurar especificamente por headers de nível 2 (##) que correspondem ao formato do documento
    sections.forEach(section => {
      const escapedName = section.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Look for various heading formats with level 2 headers (##)
      // 1. Exact match: ## Section Name
      const exactRegex = new RegExp(`(^|\\n)## ${escapedName}($|\\n)`, 'm');
      // 2. Contained match: ## Section Name with extra words
      const containedRegex = new RegExp(`(^|\\n)## .*${escapedName}.*($|\\n)`, 'm');
      // 3. Alternative heading levels for fallback
      const altLevelRegex = new RegExp(`(^|\\n)#+\\s+${escapedName}($|\\n)`, 'm');

      let match = data.match(exactRegex) || data.match(containedRegex) || data.match(altLevelRegex);

      if (match) {
        sectionMarkers.push({
          section: section,
          startIndex: match.index + match[1].length // Skip the newline if present
        });
      } else {
        console.warn(`Não encontrou seção: "${section.name}"`);
      }
    });

    // Sort section markers by their position in the document
    sectionMarkers.sort((a, b) => a.startIndex - b.startIndex);

    // Extract content for each section
    sectionMarkers.forEach((marker, index) => {
      const { section, startIndex } = marker;
      const { name, metadata } = section;
      const outputPath = join(__dirname, `${metadata.slug}.md`);

      // Calculate end index (either the start of the next section or the end of file)
      const endIndex = index < sectionMarkers.length - 1
        ? sectionMarkers[index + 1].startIndex
        : data.length;

      // Extract the content
      let sectionContent = data.substring(startIndex, endIndex).trim();

      // Create frontmatter with metadata
      const frontmatter = `---
category: ${metadata.category}
categoryId: ${metadata.categoryId}
articleId: ${index + 1}
slug: ${metadata.slug}
title: ${metadata.title}
description: ${metadata.description}
---

`;

      // Add the section ID and frontmatter at the top of the content
      sectionContent = `${frontmatter}\n\n${sectionContent}`;

      // Write the extracted content to a new file
      writeFile(outputPath, sectionContent, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file: ${outputPath}`, err);
          return;
        }
        console.log(`Section "${name}" has been written to ${metadata.slug}.md`);
      });
    });

    // Check for missing sections and provide a warning
    const foundSections = sectionMarkers.map(marker => marker.section.name);
    const missingSections = sections.filter(section => !foundSections.includes(section.name));

    if (missingSections.length > 0) {
      console.warn('As seções a seguir não foram encontradas no documento:');
      missingSections.forEach(section => {
        console.warn(`- ${section.name}`);
      });
    } else {
      console.log(`Todas as ${sections.length} seções foram encontradas e processadas.`);
    }
  });
}

// Execute the split
splitFile();