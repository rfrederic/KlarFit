# KlarFit — Category Thumbnail Prompts (11 images)

AI image prompts for the 11 category thumbnails shown on `/exercises` and in the My Program
exercise picker. Same consistent-character approach as `EXERCISE_IMAGE_PROMPTS.md`: generate one
category first, then reuse it as `--cref`/`--sref` (Midjourney) or the identical character block
verbatim (DALL-E/GPT-image/Stable Diffusion/Flux) for the rest, so the whole set reads as one
figure across all 11 tiles.

Save each output as `public/category-thumbs/{slug}.jpg`, matching the slugs in `lib/categories.ts`.
Recommended: **1024×1024px, square, JPG or WebP**. Until real renders are dropped in,
`components/exercises/CategoryThumb.tsx` renders a styled dark placeholder tile instead.

**Shared style block (append to every prompt):** 3D-rendered athletic figure, dark textured
studio background, dramatic rim lighting, matte black and charcoal skin/fabric tones, subtle
electric lime (#d7ff1e) accent glow confined to the highlighted muscle outline, photoreal render
quality, square 1:1 crop, consistent character design and lighting setup across the whole set.

---

### Abs

**abs.jpg**
```
3D-rendered athletic male figure on a dark textured background, abdominal muscles highlighted with a glowing electric lime (#d7ff1e) outline, front-facing crunch pose with the torso curled slightly forward and one hand gesturing toward the defined midsection, dramatic studio lighting, square 1:1, consistent character and style across the whole set.
```

### Back

**back.jpg**
```
3D-rendered athletic male figure on a dark textured background, the full back highlighted with a glowing electric lime (#d7ff1e) outline, rear three-quarter double-biceps pose showing the lats spread wide and the spine of the back fully visible, dramatic studio lighting, square 1:1, consistent character and style across the whole set.
```

### Biceps

**biceps.jpg**
```
3D-rendered athletic male figure on a dark textured background, one upper arm's biceps highlighted with a glowing electric lime (#d7ff1e) outline, front-facing single-arm biceps flex with the elbow bent and fist raised toward the shoulder, dramatic studio lighting, square 1:1, consistent character and style across the whole set.
```

### Calves

**calves.jpg**
```
3D-rendered athletic male figure on a dark textured background, the calves highlighted with a glowing electric lime (#d7ff1e) outline, rear view standing on tiptoes in a calf-raise pose to flex both calves, dramatic studio lighting, square 1:1, consistent character and style across the whole set.
```

### Chest

**chest.jpg**
```
3D-rendered athletic male figure on a dark textured background, the chest highlighted with a glowing electric lime (#d7ff1e) outline, front-facing most-muscular pose with fists pressed together at the sternum and the chest flexed and pushed out, dramatic studio lighting, square 1:1, consistent character and style across the whole set.
```

### Forearms

**forearms.jpg**
```
3D-rendered athletic male figure on a dark textured background, one forearm highlighted with a glowing electric lime (#d7ff1e) outline, close three-quarter framing on a raised forearm with the fist clenched tight to flex the forearm muscles, dramatic studio lighting, square 1:1, consistent character and style across the whole set.
```

### Legs

**legs.jpg**
```
3D-rendered athletic male figure on a dark textured background, the legs highlighted with a glowing electric lime (#d7ff1e) outline, front quad-sweep pose with one leg stepped forward and flexed to show the quadriceps, dramatic studio lighting, square 1:1, consistent character and style across the whole set.
```

### Neck

**neck.jpg**
```
3D-rendered athletic male figure on a dark textured background, the neck highlighted with a glowing electric lime (#d7ff1e) outline, side profile pose with the head turned slightly and chin lifted to show the neck's muscular definition, dramatic studio lighting, square 1:1, consistent character and style across the whole set.
```

### Shoulders

**shoulders.jpg**
```
3D-rendered athletic male figure on a dark textured background, the shoulders highlighted with a glowing electric lime (#d7ff1e) outline, front-facing side-lateral-raise pose with both arms raised straight out to the sides at shoulder height, dramatic studio lighting, square 1:1, consistent character and style across the whole set.
```

### Traps

**traps.jpg**
```
3D-rendered athletic male figure on a dark textured background, the trapezius highlighted with a glowing electric lime (#d7ff1e) outline, rear three-quarter shrug pose with the shoulders raised toward the ears to emphasize the raised traps, dramatic studio lighting, square 1:1, consistent character and style across the whole set.
```

### Triceps

**triceps.jpg**
```
3D-rendered athletic male figure on a dark textured background, one upper arm's triceps highlighted with a glowing electric lime (#d7ff1e) outline, rear-facing single-arm triceps flex with the arm extended straight back and the fist clenched, dramatic studio lighting, square 1:1, consistent character and style across the whole set.
```
