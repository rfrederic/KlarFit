# KlarFit — Kling Video Prompts (150 clips)

> **Update:** the workout screen's fullscreen video player (`components/ui/FullscreenVideoPlayer.tsx`)
> now fills the whole phone screen for portrait clips. **All future videos — and their start/end
> still frames — should be generated in 9:16 portrait**, not the 1:1 square used below. The player
> auto-detects aspect ratio from the video itself (portrait fills edge-to-edge with `object-cover`;
> square/landscape letterboxes centered with `object-contain`), so existing 1:1 clips keep working
> without any code change — no need to regenerate them. Filenames are unchanged either way
> (`public/exercises/{slug}.mp4`), only the framing/aspect ratio of new generations should change.

Motion prompts for Kling (image-to-video or text-to-video) to generate short looping demo
clips for the Abs Expansion, Biceps Expansion, Traps / Neck / Calves Expansion, Triceps Expansion,
Forearms Expansion, and Legs Expansion batches in `EXERCISE_IMAGE_PROMPTS.md`. Each clip is one
full rep — starting position → end position → back to start — filmed with a locked-off static
camera so it loops cleanly as a card thumbnail or detail-page clip. Two exceptions: the isometric
neck holds are a single sustained hold with visible muscle tension rather than a rep cycle, and
the Forearms Expansion clips are small, subtle movements where only the wrists move while the
forearms stay planted.

Recommended settings: 4–5 second duration, 1:1 square (or 16:9 if used on the detail page,
matching the site's video player), no camera movement, no cuts. If using image-to-video, feed
the matching `{slug}-start.jpg` from `EXERCISE_IMAGE_PROMPTS.md` as the first frame so the
athlete/lighting stay consistent with the still images.

Save each output as `public/exercises/{slug}.mp4` to match the existing naming convention
(see `data/exercises.ts`'s optional `video` field and `README.md`'s media checklist).

**Athlete blocks (same as the image prompts):**
- Male: athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes
- Female: athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes

**Shared camera/setting instruction (append to every prompt):** static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.

---

### Ab Crunch — Male

**ab-crunch.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on his back with knees bent, performing one full rep of an ab crunch: curling his shoulder blades a few inches off the floor, pausing briefly at the top, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Sit-Up — Female

**sit-up.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on her back with knees bent, performing one full rep of a sit-up: curling her torso all the way up until her chest nears her thighs, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Hands Overhead Ab Crunch — Male

**hands-overhead-ab-crunch.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on his back with arms extended overhead, performing one full rep of a hands overhead ab crunch: curling his shoulder blades off the floor while reaching his arms forward past his head, then lowering back to the overhead starting position. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Floor Crunch (Legs on Bench) — Female

**floor-crunch-legs-on-bench.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on the floor with her calves resting on a bench, performing one full rep of a floor crunch: curling her shoulder blades off the floor, pausing briefly at the top, then lowering back down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Lying Floor Leg Raise — Male

**lying-floor-leg-raise.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying flat on his back with legs extended, performing one full rep of a lying floor leg raise: raising both legs together to 90 degrees, pausing briefly, then lowering back down under control without the lower back arching. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Lying Alternate Floor Leg Raise — Female

**lying-alternate-floor-leg-raise.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying flat on her back with legs extended, performing one full cycle of alternating floor leg raises: raising one leg to 90 degrees while the other stays flat, lowering it as the opposite leg raises, in a smooth continuous rhythm. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Alternate Straight Leg Lowering — Male

**alternate-straight-leg-lowering.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on his back with both legs raised vertical, performing one full rep of alternate straight leg lowering: slowly lowering one straight leg toward the floor while the other stays vertical, then raising it back up. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Lying Leg Raise with Hip Thrust — Female

**lying-leg-raise-hip-thrust.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on her back with legs extended vertical, performing one full rep of a leg raise with hip thrust: curling her hips and pelvis up off the floor, pausing briefly, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Lying Knee Tuck to Heel Raise — Male

**lying-knee-tuck-to-heel-raise.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on his back, performing one full cycle of a knee tuck to heel raise: knees pulled toward the chest, extending the legs straight up with a slight heel raise, then tucking the knees back in. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Lying Alternate Heel Touches — Female

**lying-alternate-heel-touches.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on her back with knees bent and shoulder blades curled off the floor, performing one full cycle of alternate heel touches: reaching one hand down to tap the corresponding heel, returning to center, then reaching to tap the opposite heel. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Straight Leg Toe Touch (Floor Toe Reach) — Male

**straight-leg-toe-touch.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on his back with both legs raised vertical, performing one full rep of a straight leg toe touch: curling his shoulder blades off the floor and reaching both hands toward his toes, then lowering back down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Weighted Straight Leg Toe Touch — Female

**weighted-straight-leg-toe-touch.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on her back with both legs raised vertical, holding a light dumbbell in both hands, performing one full rep of a weighted toe touch: curling up and reaching the dumbbell toward her toes, then lowering back down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Weighted Side Touches — Male

**weighted-side-touches.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on his back with knees bent and shoulder blades curled off the floor, holding a light dumbbell in one hand, performing one full rep of a weighted side touch: reaching the dumbbell down toward the floor beside his hip by side-bending, then returning to center without resting down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Reach and Catch — Female

**reach-and-catch.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on her back with knees bent, performing one full rep of reach and catch: curling up into a full sit-up, extending both arms forward past the knees and holding briefly, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Hollow Body Hold — Male

**hollow-body-hold.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on his back with arms extended overhead and legs extended straight, lifting his shoulders and legs a few inches off the floor into a hollow body hold and sustaining the tense, slightly banana-shaped position with subtle stabilizing tremor rather than large motion. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Dragon Flag — Female

**dragon-flag.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on a bench gripping it behind her head, performing one full rep of a dragon flag: raising her legs and hips off the bench into a straight rigid line supported only by the upper back and shoulders, then lowering under control leading with the hips, keeping the body perfectly straight throughout. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Seated Leg Tucks — Male

**seated-leg-tucks.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, balanced seated on the floor on his sit bones, performing one full rep of a seated leg tuck: extending his legs out to near-straight while leaning back, then tucking the knees back in toward the chest, keeping his back flat throughout. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Abdominal Pendulum — Female

**abdominal-pendulum.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on her back with arms extended to the sides and legs raised straight up, performing one full rep of an abdominal pendulum: slowly lowering both legs together to one side, sweeping back through center and continuing to lower them toward the other side in a slow, controlled pendulum motion. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Hanging Knee Raise — Male

**hanging-knee-raise.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, hanging from a pull-up bar with an overhand grip, performing one full rep of a hanging knee raise: curling his knees up toward his chest, pausing briefly, then lowering back down to a full hang without swinging. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Twisting Hanging Knee Raise — Female

**twisting-hanging-knee-raise.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, hanging from a pull-up bar with an overhand grip, performing one full rep of a twisting hanging knee raise: raising her knees and rotating them toward one shoulder, lowering back to a hang, without swinging her body. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Weighted Hanging Knee Raise — Male

**weighted-hanging-knee-raise.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, hanging from a pull-up bar with a dumbbell held securely between his feet, performing one full rep of a weighted hanging knee raise: curling his knees up toward his chest under the added load, then lowering back down to a controlled hang without swinging. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Roman Chair Knee Raise — Female

**roman-chair-knee-raise.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, supported in a captain's chair with her forearms on the pads and legs hanging straight, performing one full rep of a Roman chair knee raise: curling her knees up toward her chest, pausing briefly, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Weighted Chair Knee Raise — Male

**weighted-chair-knee-raise.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, supported in a captain's chair with a dumbbell held between his feet, performing one full rep of a weighted chair knee raise: curling his knees up toward his chest under the added load, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Chair Leg Raise — Female

**chair-leg-raise.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, supported in a captain's chair with her forearms on the pads and legs hanging straight, performing one full rep of a chair leg raise: raising both straight legs together to hip height, pausing briefly, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Decline Bench Knee Raise — Male

**decline-bench-knee-raise.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying back on a decline bench gripping it behind his head, performing one full rep of a decline bench knee raise: curling his knees up toward his chest, pausing briefly, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Decline Bench Leg Raise — Female

**decline-bench-leg-raise.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying back on a decline bench gripping it behind her head, performing one full rep of a decline bench leg raise: raising both straight legs together to vertical, pausing briefly, then lowering back down under control without her lower back arching. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Decline Leg Raise with Hip Thrust — Male

**decline-leg-raise-hip-thrust.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying back on a decline bench gripping it behind his head with legs vertical, performing one full rep of a decline leg raise with hip thrust: curling his hips and pelvis up off the bench, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Decline Abdominal Reach — Female

**decline-abdominal-reach.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated on a decline bench with feet secured under the pads, performing one full rep of a decline abdominal reach: curling her torso up and forward, reaching both hands toward her feet, then lowering back to the leaning starting position. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Decline Weighted Abdominal Reach — Male

**decline-weighted-abdominal-reach.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated on a decline bench holding a dumbbell in both hands at his chest, performing one full rep of a decline weighted abdominal reach: curling his torso up and forward, extending the dumbbell toward his feet, then lowering back to the leaning starting position. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Decline Weighted Twist — Female

**decline-weighted-twist.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated on a decline bench holding a dumbbell with both hands at her chest, performing one full rep of a decline weighted twist: rotating her torso to bring the dumbbell toward one hip, rotating back through center and continuing to the opposite side. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Twisting Decline Sit-Up — Male

**twisting-decline-sit-up.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying back on a decline bench with feet secured under the pads, performing one full rep of a twisting decline sit-up: curling his torso up into a sit-up while rotating to bring one elbow toward the opposite knee, then lowering back down while unwinding the rotation. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Decline Cable Knee Raise — Female

**decline-cable-knee-raise.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying back on a decline bench with an ankle strap attached to a low cable pulley, performing one full rep of a decline cable knee raise: curling her knees up toward her chest against the cable's resistance, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing Cable Crunch — Male

**standing-cable-crunch.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing facing away from a high cable pulley gripping a rope attachment at his head, performing one full rep of a standing cable crunch: crunching his torso down and forward by curling his ribcage toward his hips, then rising back up under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Twisting Cable Crunch — Female

**twisting-cable-crunch.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, kneeling below a high cable pulley gripping a rope attachment at her head, performing one full rep of a twisting cable crunch: crunching down while rotating to bring one elbow toward the opposite knee, then rising back up while unwinding the rotation. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Abdominal Barbell Rollout — Male

**abdominal-barbell-rollout.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, kneeling on a padded surface gripping a weighted barbell, performing one full rep of an abdominal barbell rollout: rolling the barbell forward slowly while extending his body into a flat line, then pulling it back toward his knees under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing Barbell Twist — Female

**standing-barbell-twist.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing with a barbell across the front of her shoulders, performing one full rep of a standing barbell twist: rotating her torso and the bar to one side, back through center, and continuing to the opposite side in a smooth continuous motion. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Ball Crunch — Male

**ball-crunch.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying back over a stability ball with feet planted on the floor, performing one full rep of a ball crunch: curling his shoulder blades up off the ball, pausing briefly, then lowering back down into the stretch over the ball. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Exercise Ball Leg Tuck — Female

**exercise-ball-leg-tuck.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, in a high plank position with her shins resting on a stability ball, performing one full rep of an exercise ball leg tuck: rolling the ball inward by tucking her knees toward her chest, then extending her legs back out to the starting plank position. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

---

### Biceps Expansion (26 clips)

Same conventions as above — one full rep, static camera, filename `{slug}.mp4`, matching the athlete gender assigned to each exercise in the Biceps Expansion section of `EXERCISE_IMAGE_PROMPTS.md`.

### Seated Dumbbell Curl — Male

**seated-dumbbell-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated on the end of a flat bench holding a dumbbell in each hand at his sides, performing one full rep of a seated dumbbell curl: curling both dumbbells up toward his shoulders, pausing briefly at the top, then lowering back down under control to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Seated Hammer Curl — Female

**seated-hammer-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated on the end of a flat bench holding a dumbbell in each hand with a neutral grip, performing one full rep of a seated hammer curl: curling both dumbbells up toward her shoulders while keeping a neutral grip, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Incline Dumbbell Curl — Male

**incline-dumbbell-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying back on an incline bench holding a dumbbell in each hand, arms hanging straight down, performing one full rep of an incline dumbbell curl: curling both dumbbells up toward his shoulders, pausing at the top, then lowering back down to a full stretch. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Incline Hammer Curl — Female

**incline-hammer-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying back on an incline bench holding a dumbbell in each hand with a neutral grip, arms hanging straight down, performing one full rep of an incline hammer curl: curling both dumbbells up toward her shoulders while keeping a neutral grip, then lowering back down to a full stretch. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Spider Curl — Male

**spider-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying face-down on an incline bench with arms hanging straight down, holding a dumbbell in each hand, performing one full rep of a spider curl: curling the dumbbells up toward his shoulders while keeping his upper arms pressed against the bench pad, then lowering back down to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Zottman Curl — Female

**zottman-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing holding a dumbbell in each hand at her sides with an underhand grip, performing one full rep of a zottman curl: curling the dumbbells up to her shoulders, rotating her wrists into an overhand grip at the top, then lowering slowly back down before rotating back to underhand. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing Dumbbell Drag Curl — Male

**standing-dumbbell-drag-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing holding a dumbbell in each hand at his sides with an underhand grip, performing one full rep of a standing dumbbell drag curl: dragging the dumbbells straight up along his torso with his elbows traveling backward, then lowering back down along the same path. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing Dumbbell Reverse Curl — Female

**standing-dumbbell-reverse-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing holding a dumbbell in each hand at her sides with an overhand grip, performing one full rep of a standing dumbbell reverse curl: curling the dumbbells up toward her shoulders while keeping her wrists straight, then lowering back down to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing Concentration Curl — Male

**standing-concentration-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing hinged forward at the hips holding a dumbbell in one hand hanging straight down, free hand resting on his thigh, performing one full rep of a standing concentration curl: curling the dumbbell up toward his shoulder while keeping his upper arm still, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Pinwheel Curl — Female

**pinwheel-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing holding a dumbbell in each hand at her sides with a neutral grip, performing one full rep of a pinwheel curl: curling one dumbbell up and across her body toward the opposite shoulder with a slight torso rotation, then lowering back down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Lying Wide Dumbbell Curl — Male

**lying-wide-dumbbell-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying flat on a bench holding a dumbbell in each hand with arms extended out to the sides at shoulder height, performing one full rep of a lying wide dumbbell curl: curling the dumbbells up toward his head by bending only at the elbows, then lowering back down to the wide starting position. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Seated Barbell Curl — Female

**seated-barbell-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated on the end of a flat bench holding a barbell with an underhand, shoulder-width grip, performing one full rep of a seated barbell curl: curling the bar up through a partial range of motion, pausing at the top, then lowering back down without letting the weight rest at the bottom. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Close-Grip Barbell Curl — Male

**close-grip-barbell-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing holding a barbell with a close, underhand grip, performing one full rep of a close-grip barbell curl: curling the bar up toward his chest, pausing at the top, then lowering back down to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### EZ Bar Curl — Female

**ez-bar-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing holding an EZ curl bar with an underhand grip on the angled sections, performing one full rep of an EZ bar curl: curling the bar up toward her chest, pausing at the top, then lowering back down to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Close-Grip EZ Bar Curl — Male

**close-grip-ez-bar-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing holding an EZ curl bar with an underhand grip on the inner, narrower section, performing one full rep of a close-grip EZ bar curl: curling the bar up toward his chest, pausing at the top, then lowering back down to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### EZ Bar Preacher Curl — Female

**ez-bar-preacher-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated at a preacher bench with her upper arms resting against the pad, holding an EZ curl bar with an underhand grip, performing one full rep of an EZ bar preacher curl: curling the bar up toward her shoulders, pausing at the top, then lowering back down just short of full lockout. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### EZ Bar Preacher Reverse Curl — Male

**ez-bar-preacher-reverse-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated at a preacher bench with his upper arms resting against the pad, holding an EZ curl bar with an overhand grip, performing one full rep of an EZ bar preacher reverse curl: curling the bar up toward his shoulders while keeping his wrists straight, then lowering back down just short of full lockout. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Dumbbell Preacher Curl — Female

**dumbbell-preacher-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated at a preacher bench with one upper arm resting against the pad, holding a dumbbell with an underhand grip, performing one full rep of a dumbbell preacher curl: curling the dumbbell up toward her shoulder, pausing at the top, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Dumbbell Hammer Preacher Curl — Male

**dumbbell-hammer-preacher-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated at a preacher bench with one upper arm resting against the pad, holding a dumbbell with a neutral grip, performing one full rep of a dumbbell hammer preacher curl: curling the dumbbell up toward his shoulder while keeping a neutral grip, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Machine Preacher Curl — Female

**machine-preacher-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated at a preacher curl machine gripping the handles with her upper arms resting against the pad, performing one full rep of a machine preacher curl: curling the handles up toward her shoulders, pausing at the top, then lowering back down just short of full lockout. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Cable Preacher Curl — Male

**cable-preacher-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated at a preacher bench in front of a low cable pulley, gripping a bar attachment with an underhand grip, performing one full rep of a cable preacher curl: curling the bar up toward his shoulders against the cable's resistance, then lowering back down while keeping tension on the cable. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing One-Arm Cable Curl — Female

**standing-one-arm-cable-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing facing away from a low cable pulley, gripping a handle with an underhand grip and the arm extended down and back, performing one full rep of a standing one-arm cable curl: curling the handle up toward her shoulder, pausing briefly, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Rope Cable Curl — Male

**rope-cable-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing facing a low cable pulley fitted with a rope attachment, gripping one end in each hand with a neutral grip, performing one full rep of a rope cable curl: curling the rope up toward his shoulders and spreading the ends apart at the top, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Reverse Cable Curl — Female

**reverse-cable-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing facing a low cable pulley, gripping a straight bar attachment with an overhand grip, performing one full rep of a reverse cable curl: curling the bar up toward her chest while keeping her wrists straight, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### High Cable Curl — Male

**high-cable-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing centered between two high cable pulleys, gripping a handle in each hand with arms extended out to the sides at shoulder height, performing one full rep of a high cable curl: curling both handles in toward his head by bending only at the elbows, then lowering back down to the extended starting position. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Lying Cable Curl — Female

**lying-cable-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying flat on the floor facing a low cable pulley, gripping a bar attachment with an underhand grip, arms extended toward the pulley, performing one full rep of a lying cable curl: curling the bar up toward her chest by bending only at the elbows, then lowering back down while keeping tension on the cable. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

---

### Traps / Neck / Calves Expansion (20 clips)

Same conventions as above — one full rep (or, for the isometric neck holds, one sustained hold with visible muscle tension), static camera, filename `{slug}.mp4`, matching the athlete gender assigned to each exercise in the Traps / Neck / Calves Expansion section of `EXERCISE_IMAGE_PROMPTS.md`.

### Behind-the-Back Barbell Shrug — Male

**behind-the-back-barbell-shrug.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing holding a barbell behind his body with arms extended, the bar resting against his thighs, performing one full rep of a behind-the-back barbell shrug: shrugging his shoulders straight up toward his ears, pausing briefly at the top, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Cable Shrug — Female

**cable-shrug.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing facing a low cable pulley, gripping a bar attachment with arms extended, performing one full rep of a cable shrug: shrugging her shoulders straight up toward her ears against the cable's resistance, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Gittleson Shrug — Male

**gittleson-shrug.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated sideways on a bench, anchoring one hand under the bench and holding a dumbbell hanging straight down in the other, performing one full rep of a gittleson shrug: shrugging the working shoulder straight up toward his ear, pausing briefly at the top, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Seated Dumbbell Shrug — Female

**seated-dumbbell-shrug.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated on a bench holding a dumbbell in each hand at her sides, arms extended, performing one full rep of a seated dumbbell shrug: shrugging her shoulders straight up toward her ears, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Smith Machine Shrug — Male

**smith-machine-shrug.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing holding a Smith machine bar with arms extended, performing one full rep of a smith machine shrug: shrugging his shoulders straight up toward his ears, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Isometric Neck Exercise — Front — Female

**isometric-neck-exercise-front.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated with good posture, palm resting flat against her forehead, holding one isometric rep of a front neck exercise: gently pressing her head forward into her resisting palm and holding steady tension for a few seconds before slowly releasing. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, subtle visible muscle tension and controlled breathing throughout the hold, seamless loop.
```

### Isometric Neck Exercise — Back — Male

**isometric-neck-exercise-back.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated with good posture, hands clasped together behind his head, holding one isometric rep of a back neck exercise: gently pressing his head backward into his resisting hands and holding steady tension for a few seconds before slowly releasing. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, subtle visible muscle tension and controlled breathing throughout the hold, seamless loop.
```

### Isometric Neck Exercise — Side — Female

**isometric-neck-exercise-side.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated with good posture, palm resting flat against the side of her head, holding one isometric rep of a side neck exercise: gently pressing her head sideways into her resisting palm and holding steady tension for a few seconds before slowly releasing. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, subtle visible muscle tension and controlled breathing throughout the hold, seamless loop.
```

### Lying Face-Up Plate Neck Resistance — Male

**lying-face-up-plate-neck-resistance.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying face-up on a bench with his head hanging off the end, holding a light weight plate steady against his forehead with both hands, performing one full rep of a lying face-up plate neck resistance exercise: slowly curling his head forward to lift the plate through a small range, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Lying Face-Down Plate Neck Resistance — Female

**lying-face-down-plate-neck-resistance.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying face-down on a bench with her head hanging off the end, holding a light weight plate steady against the back of her head with both hands, performing one full rep of a lying face-down plate neck resistance exercise: slowly extending her head back to lift the plate through a small range, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Neck Bridge — Prone — Male

**neck-bridge-prone.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, on hands and knees with the top of his head lowered onto a padded surface, weight supported mainly by his hands and legs, performing one slow, controlled rep of a prone neck bridge: rocking gently forward and back through a small range while keeping most of his body weight on his hands, never bouncing. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Donkey Calf Raise — Female

**donkey-calf-raise.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, bent forward at the hips on a donkey calf raise machine, the balls of her feet on the platform and heels hanging off the edge, performing one full rep of a donkey calf raise: lowering her heels down for a deep stretch, then pressing through the balls of her feet to raise up as high as possible before lowering back down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing Dumbbell Calf Raise — Male

**standing-dumbbell-calf-raise.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing on a raised platform holding a dumbbell in each hand, heels hanging off the edge, performing one full rep of a standing dumbbell calf raise: lowering his heels down for a stretch, then rising up onto his toes as high as possible before lowering back down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing Barbell Calf Raise — Female

**standing-barbell-calf-raise.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing on a raised platform with a barbell racked across her upper back, heels hanging off the edge, performing one full rep of a standing barbell calf raise: lowering her heels down for a stretch, then rising up onto her toes as high as possible before lowering back down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing One-Leg Dumbbell Calf Raise — Male

**standing-one-leg-dumbbell-calf-raise.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing on one leg on a raised platform holding a dumbbell, the working heel hanging off the edge, performing one full rep of a standing one-leg dumbbell calf raise: lowering the working heel down for a deep stretch, then rising up onto his toes as high as possible before lowering back down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing Smith Machine Calf Raise — Female

**standing-smith-machine-calf-raise.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing on a raised block under a Smith machine bar across her upper back, heels hanging off the edge, performing one full rep of a standing smith machine calf raise: lowering her heels down for a stretch, then rising up onto her toes as high as possible before lowering back down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Seated Dumbbell Calf Raise — Male

**seated-dumbbell-calf-raise.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated on a bench with the balls of his feet on a raised platform, a dumbbell resting on each knee, heels hanging off the edge, performing one full rep of a seated dumbbell calf raise: lowering his heels down for a stretch, then raising his heels as high as possible before lowering back down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Seated Smith Machine Calf Raise — Female

**seated-smith-machine-calf-raise.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated on a bench with a Smith machine bar resting across a padded block on her knees, heels hanging off a raised platform, performing one full rep of a seated smith machine calf raise: lowering her heels down for a stretch, then raising her heels as high as possible before lowering back down. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### 45-Degree Leg Press Calf Raise — Male

**45-degree-leg-press-calf-raise.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated in a 45-degree leg press machine with only the balls of his feet on the platform, performing one full rep of a 45-degree leg press calf raise: flexing his ankles to lower his heels toward his body, then pressing through the balls of his feet to extend his ankles and push the platform away before returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Rope Jumping — Female

**rope-jumping.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing holding a jump rope handle in each hand, the rope resting behind her heels, performing several continuous reps of rope jumping: turning the rope with quick flicks of her wrists and hopping just high enough to clear it, landing softly on the balls of her feet in a steady rhythm. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

---

### Triceps Expansion (25 clips)

Same conventions as above — one full rep, static camera, filename `{slug}.mp4`, matching the athlete gender assigned to each exercise in the Triceps Expansion section of `EXERCISE_IMAGE_PROMPTS.md`.

### Triceps Dips — Male

**triceps-dips.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, supported on parallel dip bars with arms straight and his torso upright, performing one full rep of triceps dips: lowering his body by bending his elbows until his upper arms are parallel to the floor, then pressing back up to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Weighted Triceps Dips — Female

**weighted-triceps-dips.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, supported on parallel dip bars with arms straight, a weight plate attached to a dip belt around her waist, performing one full rep of weighted triceps dips: lowering her body under the added load, then pressing back up to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Close-Grip Push-Up — Male

**close-grip-push-up.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, in a high plank with his hands close together under his chest, performing one full rep of a close-grip push-up: lowering his chest toward his hands with his elbows tucked close to his torso, then pressing back up to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Body Triceps Press — Female

**body-triceps-press.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, leaning forward into a barbell racked at chest height in a squat rack, arms extended, performing one full rep of a body triceps press: bending her elbows to lower her body toward the bar, then pressing through her palms to extend her elbows and return to the starting position. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Close-Grip Bench Press — Male

**close-grip-bench-press.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on a flat bench gripping a barbell with a close, shoulder-width grip, arms extended above his chest, performing one full rep of a close-grip bench press: lowering the bar under control to his lower chest with his elbows tucked, then pressing it back up to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Smith Machine Reverse Close-Grip Bench Press — Female

**smith-machine-reverse-close-grip-bench-press.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on a flat bench gripping a Smith machine bar with an underhand, close grip, arms extended above her chest, performing one full rep of a smith machine reverse close-grip bench press: lowering the bar to her lower chest with her elbows tucked, then pressing it back up along the fixed path. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Dumbbell Triceps Kickback — Male

**dumbbell-triceps-kickback.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, hinged forward at the hips holding a dumbbell in one hand, upper arm parallel to the floor with the elbow bent, performing one full rep of a dumbbell triceps kickback: extending his elbow to kick the dumbbell straight back, squeezing at the top, then bending the elbow to return under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### One-Arm Dumbbell Overhead Extension — Female

**one-arm-dumbbell-overhead-extension.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall with one arm pressed overhead holding a dumbbell, arm fully extended, performing one full rep of a one-arm dumbbell overhead extension: bending her elbow to lower the dumbbell behind her head, then extending back up to full overhead extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Lying Dumbbell Triceps Extension — Male

**lying-dumbbell-triceps-extension.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on a flat bench holding a dumbbell in each hand above his chest, arms extended, performing one full rep of a lying dumbbell triceps extension: bending his elbows to lower the dumbbells beside his head, then pressing back up to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Incline Dumbbell Triceps Extension — Female

**incline-dumbbell-triceps-extension.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying back on an incline bench holding a dumbbell in each hand above her chest, arms extended, performing one full rep of an incline dumbbell triceps extension: bending her elbows to lower the dumbbells beside her head, then pressing back up to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Dumbbell Tate Press — Male

**dumbbell-tate-press.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on a flat bench holding a dumbbell in each hand above his chest, palms facing his feet, performing one full rep of a dumbbell Tate press: flaring his elbows out to the sides to lower the dumbbells to his chest, then pressing them back up to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### EZ-Bar Skullcrusher — Female

**ez-bar-skullcrusher.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on a flat bench holding an EZ curl bar with arms extended above her chest, performing one full rep of an EZ-bar skullcrusher: bending her elbows to lower the bar toward her forehead, then extending back up to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Reverse-Grip Skullcrusher — Male

**reverse-grip-skullcrusher.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on a flat bench holding a barbell with an underhand grip, arms extended above his chest, performing one full rep of a reverse-grip skullcrusher: bending his elbows to lower the bar toward his forehead, then extending back up to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### California Skullcrusher — Female

**california-skullcrusher.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on a flat bench holding an EZ bar with arms extended above her chest, performing one full rep of a california skullcrusher: bending her elbows to lower the bar to a shallow position near the top of her forehead, then blending into a press back up to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Overhead EZ Bar Triceps Extension — Male

**overhead-ez-bar-triceps-extension.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing tall with an EZ curl bar pressed overhead, arms fully extended, performing one full rep of an overhead EZ bar triceps extension: bending his elbows to lower the bar behind his head, then extending back up to full overhead extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Overhead Cable Triceps Extension — Female

**overhead-cable-triceps-extension.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, facing away from a high cable pulley, gripping a rope attachment overhead with her elbows bent, performing one full rep of an overhead cable triceps extension: extending her elbows to press the rope forward and up to full extension, then returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### One-Arm Standing Overhead Cable Extension — Male

**one-arm-standing-overhead-cable-extension.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, facing away from a low cable pulley, one arm raised overhead with the elbow bent gripping a handle, performing one full rep of a one-arm standing overhead cable extension: extending his elbow to press the handle up to full overhead extension, then returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### One-Arm Cable Triceps Extension — Female

**one-arm-cable-triceps-extension.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, facing a high cable pulley gripping a single handle, elbow bent at her side, performing one full rep of a one-arm cable triceps extension: extending her elbow to press the handle down to full extension, then returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Reverse-Grip Cable Pushdown — Male

**reverse-grip-cable-pushdown.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, facing a high cable pulley gripping a straight bar with an underhand grip, elbows bent at his sides, performing one full rep of a reverse-grip cable pushdown: extending his elbows to press the bar down to full extension, then returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Incline Cable Triceps Extension — Female

**incline-cable-triceps-extension.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying back on an incline bench facing away from a low cable pulley, gripping a rope attachment overhead with her elbows bent, performing one full rep of an incline cable triceps extension: extending her elbows to press the attachment forward and up to full extension, then returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Cable Lying Triceps Extension — Male

**cable-lying-triceps-extension.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying on a flat bench near a low cable pulley, gripping a bar attachment overhead with arms extended, performing one full rep of a cable lying triceps extension: bending his elbows to lower the attachment toward his forehead, then extending back up to full extension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Low Cable Triceps Extension — Female

**low-cable-triceps-extension.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall facing away from a low cable pulley, gripping a handle with the elbow bent near her shoulder, performing one full rep of a low cable triceps extension: extending her elbow to press the handle down and back to full extension, then returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Kneeling Cable Triceps Extension Over Flat Bench — Male

**kneeling-cable-triceps-extension-over-flat-bench.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, kneeling behind a flat bench with his upper arms resting on top, gripping a rope attachment with elbows bent, performing one full rep of a kneeling cable triceps extension over a flat bench: extending his elbows to press the attachment forward to full extension, then returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Cable Concentration Triceps Extension — Female

**cable-concentration-triceps-extension.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, kneeling beside a low cable pulley with her upper arm braced against her inner thigh, gripping a handle, performing one full rep of a cable concentration triceps extension: extending her elbow to press the handle forward to full extension, then returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Cable Triceps Kickback — Male

**cable-triceps-kickback.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, hinged forward at the hips facing a low cable pulley, upper arm parallel to the floor with the elbow bent gripping a handle, performing one full rep of a cable triceps kickback: extending his elbow to kick the handle straight back, squeezing at the top, then returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

---

### Forearms Expansion (7 clips)

Same conventions as above, with one difference: these are small, subtle movements, so every prompt calls out that only the wrists move while the forearms stay planted — filename `{slug}.mp4`, matching the athlete gender assigned to each exercise in the Forearms Expansion section of `EXERCISE_IMAGE_PROMPTS.md`.

### Reverse Dumbbell Wrist Curl — Male

**reverse-dumbbell-wrist-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated with his forearms resting on his thighs, holding a dumbbell in each hand with palms facing down, wrists flexed down, performing one full rep of a reverse dumbbell wrist curl: extending his wrists to raise the backs of his hands as high as possible, then lowering back down, with only the wrists moving and his forearms staying planted on his thighs. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, a small, subtle movement — only the wrists move, forearms stay planted the entire time — smooth continuous motion, seamless loop.
```

### Neutral-Grip Dumbbell Wrist Curl — Female

**neutral-grip-dumbbell-wrist-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated with her forearm resting on her thigh, holding a dumbbell with a neutral, hammer-style grip, wrist tilted toward the pinky side, performing one full rep of a neutral-grip dumbbell wrist curl: tilting her wrist toward the thumb side to raise the dumbbell head, then tilting back down, with only the wrist moving side to side and her forearm staying planted on her thigh. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, a small, subtle movement — only the wrists move, forearms stay planted the entire time — smooth continuous motion, seamless loop.
```

### Reverse Barbell Wrist Curl — Male

**reverse-barbell-wrist-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated with his forearms resting on his thighs, gripping a barbell with an overhand grip, wrists flexed down, performing one full rep of a reverse barbell wrist curl: extending his wrists to raise the bar as high as possible, then lowering back down, with only the wrists moving and his forearms staying planted on his thighs. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, a small, subtle movement — only the wrists move, forearms stay planted the entire time — smooth continuous motion, seamless loop.
```

### Behind-the-Back Barbell Wrist Curl — Female

**behind-the-back-barbell-wrist-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall holding a barbell behind her thighs with an overhand grip, wrists extended down, performing one full rep of a behind-the-back barbell wrist curl: curling her wrists up as high as possible, then lowering back down, with only the wrists moving and her arms staying still at her sides. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, a small, subtle movement — only the wrists move, forearms stay planted the entire time — smooth continuous motion, seamless loop.
```

### Seated Cable Reverse Wrist Curl — Male

**seated-cable-reverse-wrist-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated facing a low cable pulley with his forearms resting on his thighs, gripping a straight bar with an overhand grip, wrists flexed down, performing one full rep of a seated cable reverse wrist curl: extending his wrists to raise the bar against the cable's resistance, then lowering back down, with only the wrists moving and his forearms staying planted on his thighs. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, a small, subtle movement — only the wrists move, forearms stay planted the entire time — smooth continuous motion, seamless loop.
```

### Single-Arm Cable Wrist Curl (Palms Up) — Female

**single-arm-cable-wrist-curl-palms-up.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, kneeling with her forearm resting on a flat bench facing a low cable pulley, gripping a handle with the palm up, wrist extended down, performing one full rep of a single-arm cable wrist curl with palms up: curling her wrist up as high as possible, then lowering back down, with only the wrist moving and her forearm staying planted on the bench. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, a small, subtle movement — only the wrists move, forearms stay planted the entire time — smooth continuous motion, seamless loop.
```

### Single-Arm Cable Wrist Curl (Palms Down) — Male

**single-arm-cable-wrist-curl-palms-down.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, kneeling with his forearm resting on a flat bench facing a low cable pulley, gripping a handle with the palm down, wrist extended up, performing one full rep of a single-arm cable wrist curl with palms down: flexing his wrist down and then extending back up, with only the wrist moving and his forearm staying planted on the bench. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, a small, subtle movement — only the wrists move, forearms stay planted the entire time — smooth continuous motion, seamless loop.
```

---

### Legs Expansion (34 clips)

Same conventions as above — one full rep, static camera, filename `{slug}.mp4`, matching the athlete gender assigned to each exercise in the Legs Expansion section of `EXERCISE_IMAGE_PROMPTS.md`.

### Barbell Front Squat — Male

**barbell-front-squat.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing tall with a barbell racked across the front of his shoulders, elbows raised high, performing one full rep of a barbell front squat: bending his hips and knees to squat down keeping his torso upright, then driving through his whole foot to stand back up. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Barbell Box Squat — Female

**barbell-box-squat.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall with a barbell racked across her upper back in front of a bench, performing one full rep of a barbell box squat: sitting back and down under control onto the bench, then driving through her whole foot to stand back up. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Barbell Hack Squat — Male

**barbell-hack-squat.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing tall holding a barbell behind his thighs with an overhand grip, performing one full rep of a barbell hack squat: bending his hips and knees to squat down with the bar traveling close to his legs, then standing back up. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Dumbbell Bulgarian Split Squat — Female

**dumbbell-bulgarian-split-squat.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall holding a dumbbell in each hand with her rear foot elevated on a bench behind her, performing one full rep of a dumbbell Bulgarian split squat: bending her front knee to lower her rear knee toward the floor, then driving through her front heel to stand back up. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Double Kettlebell Front Squat — Male

**double-kettlebell-front-squat.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing tall with a kettlebell racked at each shoulder, performing one full rep of a double kettlebell front squat: bending his hips and knees to squat down keeping his torso upright, then standing back up. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Landmine Goblet Squat — Female

**landmine-goblet-squat.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall holding a landmine barbell attachment close to her chest, performing one full rep of a landmine goblet squat: bending her hips and knees to squat down keeping the bar close to her body, then standing back up. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Kneeling Squat — Male

**kneeling-squat.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, kneeling on a padded surface with a barbell racked across his upper back, hips sat back toward his heels, performing one full rep of a kneeling squat: squeezing his glutes to drive his hips forward and rise up onto his knees, then sitting back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Smith Machine Squat — Female

**smith-machine-squat.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall with a Smith machine bar racked across her upper back, performing one full rep of a smith machine squat: bending her hips and knees to squat down along the fixed bar path, then pressing back up to standing. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Smith Machine Front Squat — Male

**smith-machine-front-squat.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing tall with a Smith machine bar racked across the front of his shoulders, elbows raised high, performing one full rep of a smith machine front squat: bending his hips and knees to squat down along the fixed bar path, then pressing back up to standing. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Barbell Lunge — Female

**barbell-lunge.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall with a barbell racked on her upper back, one foot staggered forward, performing one full rep of a barbell lunge: bending both knees to lower her rear knee toward the floor, then driving through her front heel to stand back up. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Barbell Walking Lunge — Male

**barbell-walking-lunge.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing tall with a barbell racked on his upper back, feet hip-width apart, performing one full walking-lunge cycle: stepping forward into a long stride, lowering his rear knee toward the floor, then driving up and bringing his back foot through into the next stride. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Dumbbell Lunge — Female

**dumbbell-lunge.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall holding a dumbbell in each hand, one foot staggered forward, performing one full rep of a dumbbell lunge: bending both knees to lower her rear knee toward the floor, then driving through her front heel to stand back up. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Smith Machine Lunge — Male

**smith-machine-lunge.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing under a Smith machine bar racked on his upper back, one foot staggered forward, performing one full rep of a smith machine lunge: bending both knees to lower his rear knee toward the floor, then driving through his front heel to stand back up. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Landmine Reverse Lunge — Female

**landmine-reverse-lunge.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall holding a landmine barbell attachment at her chest, feet together, performing one full rep of a landmine reverse lunge: stepping one foot backward and bending both knees to lower her rear knee toward the floor, then driving through her front heel to stand back up. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Barbell Step-Up — Male

**barbell-step-up.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing tall in front of a bench with a barbell racked on his upper back, one foot planted on the bench, performing one full rep of a barbell step-up: driving through his front heel to step up onto the bench, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Barbell Stiff-Leg Deadlift — Female

**barbell-stiff-leg-deadlift.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall holding a barbell in front of her thighs with nearly straight legs, performing one full rep of a barbell stiff-leg deadlift: hinging at her hips to lower the bar along her legs with a neutral spine, then driving her hips forward to return to standing. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Dumbbell Stiff-Leg Deadlift — Male

**dumbbell-stiff-leg-deadlift.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing tall holding a dumbbell in each hand in front of his thighs with nearly straight legs, performing one full rep of a dumbbell stiff-leg deadlift: hinging at his hips to lower the dumbbells along his legs with a neutral spine, then driving his hips forward to return to standing. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Smith Machine Stiff-Leg Deadlift — Female

**smith-machine-stiff-leg-deadlift.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall gripping a Smith machine bar with nearly straight legs, performing one full rep of a smith machine stiff-leg deadlift: hinging at her hips to lower the bar along the fixed path with a neutral spine, then driving her hips forward to return to standing. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Barbell Sumo Romanian Deadlift — Male

**barbell-sumo-romanian-deadlift.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing tall in a wide sumo stance holding a barbell in front of his thighs, performing one full rep of a barbell sumo Romanian deadlift: hinging at his hips to lower the bar with a neutral spine, then driving his hips forward to return to standing. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Kettlebell Sumo Deadlift — Female

**kettlebell-sumo-deadlift.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing tall in a wide sumo stance over a kettlebell on the floor, performing one full rep of a kettlebell sumo deadlift: hinging down to grip the kettlebell with a neutral spine, then driving through her heels to stand up to lockout. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Single-Leg Barbell Deadlift — Male

**single-leg-barbell-deadlift.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing tall on one leg holding a barbell in front of his thighs, performing one full rep of a single-leg barbell deadlift: hinging forward on his standing leg while his other leg extends back for balance, then driving his hips forward to return to standing. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Banded Deadlift — Female

**banded-deadlift.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing over a barbell on the floor with heavy resistance bands looped around the ends, performing one full rep of a banded deadlift: hinging down to grip the bar with a neutral spine, then driving through her heels to stand up to lockout against the increasing band tension. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Jefferson Deadlift — Male

**jefferson-deadlift.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, straddling a barbell on the floor in an unusual stance, one hand in front and one hand behind his body, performing one full rep of a Jefferson deadlift: bending his knees to grip the bar, then driving through both legs to stand up to lockout in the straddle stance. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing Leg Curl — Female

**standing-leg-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing at a leg curl machine with her working leg extended, ankle braced against the padded lever, performing one full rep of a standing leg curl: bending her knee to curl her heel up toward her glute, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Standing Cable Hamstring Curl — Male

**standing-cable-hamstring-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, standing facing a low cable pulley with an ankle cuff secured around one ankle, leg extended, performing one full rep of a standing cable hamstring curl: bending his knee to curl his heel up toward his glute against the cable's resistance, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Lying Cable Hamstring Curl — Female

**lying-cable-hamstring-curl.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying face-down on a flat bench with an ankle cuff secured around one ankle, leg extended, performing one full rep of a lying cable hamstring curl: bending her knee to curl her heel up toward her glute against the cable's resistance, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Dumbbell Hamstring Curl — Male

**dumbbell-hamstring-curl.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, lying face-down with legs extended, a dumbbell held securely between his feet, performing one full rep of a dumbbell hamstring curl: bending his knees to curl his heels up toward his glutes while keeping the dumbbell squeezed between his feet, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Cable Pull-Through — Female

**cable-pull-through.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, standing facing away from a low cable pulley, gripping a rope attachment between her legs, performing one full rep of a cable pull-through: hinging at her hips to let the attachment travel between her legs, then driving her hips forward to stand up and squeeze her glutes. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Single-Leg Dumbbell Hip Thrust — Male

**single-leg-dumbbell-hip-thrust.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated with his upper back against a bench, holding a dumbbell across his hips, one leg extended forward, performing one full rep of a single-leg dumbbell hip thrust: driving through his planted heel to lift his hips toward the ceiling, squeezing his glute, then lowering back down under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Glute-Focused Hyperextension — Female

**glute-focused-hyperextension.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, on a hyperextension bench with her hips supported and ankles secured, upper back rounded forward at the bottom, performing one full rep of a glute-focused hyperextension: squeezing her glutes to raise her torso to a straight line, then lowering back down to the rounded starting position under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Hip Abduction Machine — Male

**hip-abduction-machine.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated in a hip abduction machine with his legs together against the movement pads, performing one full rep of a hip abduction machine exercise: pressing his knees outward to open his legs as wide as the machine allows, then returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Hip Adduction Machine — Female

**hip-adduction-machine.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, seated in a hip adduction machine with her legs opened wide against the movement pads, performing one full rep of a hip adduction machine exercise: squeezing her inner thighs to bring her knees together, then returning under control. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Single-Leg 45-Degree Leg Press — Male

**single-leg-45-degree-leg-press.mp4**
```
Athletic man in his early 30s, short dark hair, medium build, wearing a fitted charcoal t-shirt and black training shorts, gray training shoes, seated in a 45-degree leg press machine with one foot centered on the platform, other foot resting off to the side, performing one full rep of a single-leg 45-degree leg press: bending his working knee to lower the platform toward his chest, then pressing through his whole foot to extend his leg back out. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```

### Smith Machine Leg Press — Female

**smith-machine-leg-press.mp4**
```
Athletic woman in her early 30s, dark hair in a ponytail, toned build, wearing a fitted charcoal sports bra and black leggings, gray training shoes, lying on the floor under a Smith machine bar set near the bottom of its rails, feet planted flat against the bar, knees bent, performing one full rep of a smith machine leg press: pressing through her whole foot to extend her knees and push the bar up, then lowering it back down under control toward her chest, always within the safety stops. Static locked-off camera, no camera movement, no cuts, side-angle view in a modern dark gym studio with matte black walls and subtle electric lime accent lighting, dramatic side lighting, photorealistic, smooth continuous motion, seamless loop.
```
