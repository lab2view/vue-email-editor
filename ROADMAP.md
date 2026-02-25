# Roadmap — Dominer le marche des editeurs email

## Positionnement

**La formule gagnante** : L'open-source de GrapesJS + les features d'Unlayer + la DX de Vue 3

**Message cle** : "Tout ce qu'Unlayer facture $750/mois, inclus gratuitement."

## Contexte concurrentiel

| | Prix | Vue natif | Open source | MJML | Blocs custom | Merge tags |
|---|---|---|---|---|---|---|
| **Nous (actuel)** | Gratuit | Oui | MIT | Oui | Oui (gratuit) | Basique |
| **Unlayer** | $250-2000/mois | Wrapper | Non | Non | $750+/mois | $750+/mois |
| **Beefree** | Tiers payes | Non | Non | Non | Payant | Payant |
| **GrapesJS** | Gratuit | Non | BSD | Plugin | Oui | Custom |

**Nos avantages actuels** : Vue 3 natif, MJML, TypeScript, plugin system, 43 blocs, gratuit
**Nos faiblesses** : DnD basique, pas d'upload image, peu de templates, pas de doc site, pas de merge tags inline

---

## Sprint A — Stabilite & Tests E2E (1 semaine)

*Objectif : Base solide avant d'ajouter des features. Zero regression.*

### A.1 Tests d'integration composant
- [ ] `EmailEditor.spec.ts` — mount, expose API, plugins init
- [ ] Test workflow complet : load template -> edit -> undo -> export MJML/HTML/JSON
- [ ] Test drag & drop : ajouter bloc, reorder, supprimer

### A.2 Tests E2E avec Playwright
- [ ] Setup Playwright avec un app de test minimal (Vue + EmailEditor)
- [ ] Scenario : ouvrir editeur -> ajouter bloc texte -> editer -> export HTML
- [ ] Scenario : charger template -> modifier -> undo -> verifier contenu
- [ ] Scenario : mobile preview -> verifier largeur iframe
- [ ] CI GitHub Actions : typecheck + vitest + playwright sur chaque PR

### A.3 Regression guards
- [ ] Snapshot tests sur les exports MJML (templates starters)
- [ ] Visual regression tests sur les blocs composites (screenshot comparisons)

---

## Sprint B — DX & Documentation (1 semaine)

*Objectif : Les developpeurs doivent pouvoir decouvrir, comprendre et integrer en < 10 minutes.*

### B.1 Site de documentation (VitePress)
- [ ] Setup VitePress dans `docs/`
- [ ] Guide "Getting Started" avec copier-coller qui marche
- [ ] Guide "Theming" avec live preview
- [ ] Guide "Plugins" avec exemples concrets
- [ ] Reference API complete (generee depuis les types)
- [ ] Deployer sur GitHub Pages ou Netlify

### B.2 Playground interactif
- [ ] Demo live embeddee dans la doc (StackBlitz ou iframe)
- [ ] Exemples : basique, theme custom, plugin custom, FR labels
- [ ] Lien "Edit on StackBlitz" dans le README

### B.3 Storybook (optionnel)
- [ ] Stories pour chaque bloc (layout, content, composite)
- [ ] Stories pour le theme system
- [ ] Stories pour les property editors

---

## Sprint C — Image Upload & Asset Manager (1 semaine)

*Objectif : Feature #1 manquante. Sans ca, aucun usage production serieux.*

### C.1 Callback d'upload
- [ ] Prop `onImageUpload: (file: File) => Promise<string>` sur EmailEditor
- [ ] Le consommateur gere son propre storage (S3, Cloudinary, etc.)
- [ ] UI : bouton "Upload" dans le property editor image + drag & drop sur le champ
- [ ] Preview immediate avec URL.createObjectURL pendant l'upload
- [ ] Gestion erreur (taille max, format invalide)

### C.2 Asset Manager
- [ ] Prop `onBrowseAssets?: () => Promise<string>` — ouvre le picker du consommateur
- [ ] Ou prop `assets?: string[]` — liste d'URLs a afficher dans un picker integre
- [ ] Galerie d'images avec recherche, preview, selection
- [ ] Historique des images uploadees (session-only ou persistable via callback)

### C.3 Image editing basique
- [ ] Crop ratio presets (1:1, 16:9, 4:3)
- [ ] Redimensionnement avec contrainte de ratio
- [ ] Alt text obligatoire (a11y)

---

## Sprint D — Drag & Drop avance (1-2 semaines)

*Objectif : L'UX de drag doit etre au niveau Unlayer. C'est le "wow factor".*

### D.1 Ghost preview
- [ ] Lors du drag depuis le sidebar, afficher un ghost translucide du bloc
- [ ] Le ghost suit la souris avec offset
- [ ] Animation de "place" quand on drop

### D.2 Drop zones ameliorees
- [ ] Indicateurs visuels clairs : ligne bleue entre les blocs, zone highlight dans les colonnes
- [ ] "Snap" guides quand on s'approche d'une zone de drop
- [ ] Feedback visuel quand le drop est invalide (zone rouge)

### D.3 Drag depuis le canvas
- [ ] Reorder par drag & drop directement dans le canvas (pas seulement via Layers)
- [ ] Handle de drag sur hover (icone grip a gauche du bloc)
- [ ] Auto-scroll quand on drag pres des bords

### D.4 Drag entre colonnes
- [ ] Deplacer un element d'une colonne a une autre par drag
- [ ] Redimensionner les colonnes par drag du separateur

---

## Sprint E — Merge Tags & Variables (1 semaine)

*Objectif : Feature killer. Unlayer la facture $750/mois. Nous : gratuit.*

### E.1 Systeme de merge tags
- [ ] Prop `mergeTags?: MergeTag[]` avec `{ name: string, value: string, category?: string }`
- [ ] Ex: `[{ name: 'Prenom', value: '{{first_name}}', category: 'Contact' }]`
- [ ] Dropdown dans l'editeur TipTap : taper `{{` declenche l'autocompletion
- [ ] Les tags s'affichent comme des "chips" colores dans l'editeur
- [ ] Non-editable inline, supprimables en un clic
- [ ] Export : les tags restent en `{{first_name}}` dans le MJML/HTML

### E.2 Tags dans les proprietes
- [ ] Les champs URL, alt text, src acceptent aussi les merge tags
- [ ] Autocompletion dans les inputs de proprietes

### E.3 Preview avec donnees
- [ ] Prop `mergeTagsPreviewData?: Record<string, string>`
- [ ] Mode preview qui remplace les tags par les vraies valeurs
- [ ] Toggle preview/edit dans la toolbar

---

## Sprint F — Templates Pro (1 semaine)

*Objectif : Un catalogue qui fait pro et donne envie.*

### F.1 Templates starters enrichis
- [ ] 20+ templates categorises : Newsletter, Promotion, Transactionnel, Evenement, E-commerce, SaaS
- [ ] Chaque template utilise des images placeholder de qualite (pas via.placeholder.com)
- [ ] Previews visuelles dans le panel (thumbnail genere)

### F.2 Template management API
- [ ] `onSaveTemplate?: (template: EmailDesignJson, meta: TemplateMeta) => Promise<void>`
- [ ] `onLoadTemplates?: () => Promise<TemplateMeta[]>`
- [ ] Le consommateur gere le stockage, l'editeur gere l'UI
- [ ] Sauvegarder comme template depuis le menu

### F.3 Sections reutilisables
- [ ] "Sauvegarder comme section" sur n'importe quelle section
- [ ] Panel "Mes sections" dans le sidebar
- [ ] Drag & drop des sections sauvegardees

---

## Sprint G — Contenu conditionnel & AI hooks (1-2 semaines)

*Objectif : Features que meme Unlayer galere a offrir. Differenciation maximale.*

### G.1 Blocs conditionnels
- [ ] Wrapper `<ConditionalBlock>` avec condition sur merge tag
- [ ] Ex: "Afficher seulement si `{{plan}}` == 'premium'"
- [ ] UI : icone condition sur le bloc, panneau de configuration
- [ ] Export : commentaires HTML conditionnels ou syntaxe ESP

### G.2 AI Integration hooks
- [ ] Prop `aiProvider?: AiProvider` avec interface :
  ```ts
  interface AiProvider {
    generateText: (prompt: string, context: string) => Promise<string>
    generateSubjectLine?: (emailContent: string) => Promise<string[]>
    improveText?: (text: string, instruction: string) => Promise<string>
  }
  ```
- [ ] Bouton "AI" dans la toolbar TipTap
- [ ] "Generer du texte", "Ameliorer", "Raccourcir", "Traduire"
- [ ] Le consommateur branche son propre provider (OpenAI, Anthropic, etc.)

### G.3 Dark mode email preview
- [ ] Toggle "Dark mode preview" dans la toolbar
- [ ] Simule le rendu dark mode des clients email (Gmail, Apple Mail, Outlook)
- [ ] Aide visuelle pour les couleurs problematiques en dark mode

---

## Sprint H — Performance & Bundle (1 semaine)

*Objectif : Plus rapide que GrapesJS, bundle plus petit qu'Unlayer.*

### H.1 Lazy loading
- [ ] Code-split les blocs composites (charge a la demande)
- [ ] Code-split CodeMirror (deja fait) et TipTap
- [ ] Mesurer le bundle : objectif < 200KB gzip pour le core

### H.2 Virtual scrolling
- [ ] Virtualiser la liste des blocs quand > 50 blocs (avec plugins)
- [ ] Virtualiser les layers pour les gros documents

### H.3 Performance canvas
- [ ] Debounce le re-render MJML (deja 300ms, verifier)
- [ ] Optimiser les re-renders Vue avec `shallowRef` ou `markRaw` la ou possible
- [ ] Benchmark : temps de render d'un document de 50 sections

---

## Sprint I — Integrations ESP (1 semaine)

*Objectif : Un avantage unique — export pre-configure pour chaque ESP.*

### I.1 Export presets
- [ ] `exportForMailchimp()` — merge tags `*|FNAME|*`, format compatible
- [ ] `exportForSendGrid()` — handlebars `{{first_name}}`
- [ ] `exportForAWS_SES()` — template variables
- [ ] `exportForBrevo()` — merge tags `{{ contact.FIRSTNAME }}`
- [ ] Chaque preset mappe les merge tags + applique les bonnes contraintes HTML

### I.2 Documentation ESP
- [ ] Guide d'integration par ESP dans la doc VitePress
- [ ] Exemples copier-coller fonctionnels

---

## Sprint J — Community & Adoption (continu)

### J.1 Visibilite
- [ ] Article "How we built a free Unlayer alternative" sur dev.to
- [ ] Post sur r/vuejs, HackerNews, Product Hunt
- [ ] Badge "Made with Vue" + "Built on MJML" dans le README
- [ ] Comparaison detaillee dans la doc (vs Unlayer, vs GrapesJS)
- [ ] Demo en ligne accessible sans installation

### J.2 Contribution
- [ ] CONTRIBUTING.md avec guide de dev
- [ ] Issues "good first issue" taggees
- [ ] Templates d'issues (bug report, feature request)
- [ ] Discord ou GitHub Discussions

### J.3 Ecosysteme de plugins
- [ ] Plugin officiel : `@lab2view/vue-email-editor-plugin-ai`
- [ ] Plugin officiel : `@lab2view/vue-email-editor-plugin-unsplash` (images gratuites)
- [ ] Guide "Create your own plugin" dans la doc
- [ ] Registry de plugins communautaires

---

## Ordre de priorite

```
Sprint A (Stabilite)     ← fondation, non-negociable
  |
Sprint B (Documentation) ← adoption, decouverte
  |
Sprint C (Image Upload)  ← blocker #1 pour usage prod
  |
Sprint D (DnD avance)    ← wow factor, UX competitive
  |
Sprint E (Merge Tags)    ← killer feature gratuite vs $750/mois
  |
Sprint F (Templates Pro) ← catalogue qui fait pro
  |
Sprint G (AI + Conditionnel) ← differenciation unique
  |
Sprint H (Performance)   ← scalabilite
  |
Sprint I (Integrations)  ← adoption enterprise
  |
Sprint J (Community)     ← croissance organique
```

## Metriques de succes

| Metrique | 3 mois | 6 mois | 12 mois |
|---|---|---|---|
| npm weekly downloads | 500 | 2 000 | 5 000+ |
| GitHub stars | 200 | 1 000 | 3 000+ |
| Templates inclus | 20 | 50 | 100+ |
| Plugins officiels | 2 | 5 | 10+ |
| Tests coverage | 80% | 90% | 95% |
| Lighthouse a11y | 90+ | 95+ | 98+ |
