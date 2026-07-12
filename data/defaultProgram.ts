import { UserProgram } from "@/lib/types";

/**
 * Seed data for the My Program page. Loaded into localStorage the first time
 * the page is visited, and restored verbatim by the "Reset to default" button.
 * Exercises that exist in data/exercises.ts are linked via exerciseSlug; the
 * rest (warm-ups, finishers, and one placeholder still to be confirmed) are
 * plain custom entries.
 */
export const defaultProgram: UserProgram = {
  days: [
    {
      id: "monday",
      day: "Monday",
      focus: "Legs + Calves",
      sections: [
        {
          id: "monday-warmup",
          title: "Warm-Up (5 min)",
          exercises: [
            { id: "monday-warmup-1", label: "Full-body stretch", sets: null, reps: "5 min" },
          ],
        },
        {
          id: "monday-legs",
          title: "Legs",
          exercises: [
            { id: "monday-legs-1", exerciseSlug: "barbell-back-squat", label: "Barbell Squats (plates under heels)", sets: 3, reps: "10" },
            { id: "monday-legs-2", exerciseSlug: "leg-press", label: "Leg Press", sets: 4, reps: "12" },
            { id: "monday-legs-3", exerciseSlug: "leg-extension-machine", label: "Leg Extension", sets: 3, reps: "10" },
            { id: "monday-legs-4", exerciseSlug: "leg-curl-machine", label: "Hamstring Curl Machine", sets: 3, reps: "12" },
          ],
        },
        {
          id: "monday-calves",
          title: "Calves",
          exercises: [
            { id: "monday-calves-1", exerciseSlug: "standing-calf-raise", label: "Standing Calf Raise", sets: 4, reps: "15" },
            { id: "monday-calves-2", exerciseSlug: "seated-calf-raise", label: "Seated Calf Machine", sets: 3, reps: "15" },
          ],
        },
        {
          id: "monday-finisher",
          title: "Finisher (5 min)",
          exercises: [
            { id: "monday-finisher-1", exerciseSlug: "wall-sit", label: "Wall Sit", sets: null, reps: "1-2 rounds" },
          ],
        },
      ],
    },
    {
      id: "tuesday",
      day: "Tuesday",
      focus: "Pull (Back, Biceps, Traps)",
      sections: [
        {
          id: "tuesday-warmup",
          title: "Warm-Up (5 min)",
          exercises: [
            { id: "tuesday-warmup-1", label: "Light lat pulldown + band pulls", sets: null, reps: "5 min" },
          ],
        },
        {
          id: "tuesday-back",
          title: "Back",
          exercises: [
            { id: "tuesday-back-1", exerciseSlug: "lat-pulldown", label: "Lat Pulldown", sets: 4, reps: "10" },
            { id: "tuesday-back-2", exerciseSlug: "seated-cable-row", label: "Seated Row Machine", sets: 3, reps: "12" },
            { id: "tuesday-back-3", exerciseSlug: "t-bar-row", label: "T-Bar Row", sets: 3, reps: "10" },
          ],
        },
        {
          id: "tuesday-biceps",
          title: "Biceps",
          exercises: [
            { id: "tuesday-biceps-1", exerciseSlug: "dumbbell-bicep-curl", label: "Dumbbell Curls", sets: 3, reps: "12" },
            { id: "tuesday-biceps-2", exerciseSlug: "cable-curl", label: "Cable Curls", sets: 3, reps: "12" },
          ],
        },
        {
          id: "tuesday-forearms",
          title: "Forearms",
          exercises: [
            { id: "tuesday-forearms-1", exerciseSlug: "wrist-curl", label: "Wrist Curls", sets: 3, reps: "15" },
            { id: "tuesday-forearms-2", exerciseSlug: "reverse-curl", label: "Reverse Curls", sets: 3, reps: "12" },
          ],
        },
        {
          id: "tuesday-finisher",
          title: "Finisher (5 min)",
          exercises: [
            { id: "tuesday-finisher-1", exerciseSlug: "dead-hang", label: "Dead Hang", sets: null, reps: "40-60 sec" },
          ],
        },
      ],
    },
    {
      id: "wednesday",
      day: "Wednesday",
      focus: "Push (Chest, Shoulders, Triceps)",
      sections: [
        {
          id: "wednesday-warmup",
          title: "Warm-Up (5 min)",
          exercises: [
            {
              id: "wednesday-warmup-1",
              label: "Empty bar presses, treadmill walk + shoulder mobility",
              sets: null,
              reps: "5 min",
            },
          ],
        },
        {
          id: "wednesday-chest",
          title: "Chest",
          exercises: [
            { id: "wednesday-chest-1", exerciseSlug: "barbell-bench-press", label: "Barbell Bench Press", sets: 4, reps: "8" },
            { id: "wednesday-chest-2", exerciseSlug: "incline-dumbbell-press", label: "Incline Dumbbell Press", sets: 3, reps: "10" },
            { id: "wednesday-chest-3", exerciseSlug: "close-grip-dumbbell-press", label: "Close-Grip Dumbbell Press", sets: 3, reps: "12" },
            { id: "wednesday-chest-4", label: "Placeholder — exercise to confirm", sets: 3, reps: "12" },
            { id: "wednesday-chest-5", exerciseSlug: "dumbbell-chest-fly", label: "Dumbbell Chest Flys", sets: 3, reps: "12" },
          ],
        },
        {
          id: "wednesday-shoulders",
          title: "Shoulders",
          exercises: [
            { id: "wednesday-shoulders-1", exerciseSlug: "dumbbell-shoulder-press", label: "Dumbbell Shoulder Press", sets: 3, reps: "10" },
            { id: "wednesday-shoulders-2", exerciseSlug: "cable-lateral-raise", label: "Cable Lateral Raises", sets: 3, reps: "12" },
          ],
        },
        {
          id: "wednesday-triceps",
          title: "Triceps",
          exercises: [
            { id: "wednesday-triceps-1", exerciseSlug: "cable-triceps-pushdown", label: "Rope Pushdown", sets: 3, reps: "12" },
            {
              id: "wednesday-triceps-2",
              exerciseSlug: "triceps-dip",
              label: "Smith Machine Close-Grip Press or Dips",
              sets: 3,
              reps: "10",
            },
          ],
        },
        {
          id: "wednesday-finisher",
          title: "Finisher (5 min)",
          exercises: [
            { id: "wednesday-finisher-1", exerciseSlug: "push-up", label: "Push-Up Burnout", sets: null, reps: "burnout" },
          ],
        },
      ],
    },
    {
      id: "thursday",
      day: "Thursday",
      focus: "Upper Body Mix",
      sections: [
        {
          id: "thursday-warmup",
          title: "Warm-Up (5 min)",
          exercises: [
            { id: "thursday-warmup-1", label: "Row machine + push-ups", sets: null, reps: "5 min" },
          ],
        },
        {
          id: "thursday-chest",
          title: "Chest",
          exercises: [
            { id: "thursday-chest-1", exerciseSlug: "cable-fly", label: "Cable Fly (Low to High)", sets: 3, reps: "12" },
          ],
        },
        {
          id: "thursday-back",
          title: "Back",
          exercises: [
            { id: "thursday-back-1", exerciseSlug: "dumbbell-row", label: "Single-Arm Dumbbell Row", sets: 3, reps: "12" },
          ],
        },
        {
          id: "thursday-shoulders",
          title: "Shoulders",
          exercises: [
            { id: "thursday-shoulders-1", exerciseSlug: "arnold-press", label: "Arnold Press", sets: 3, reps: "10" },
            { id: "thursday-shoulders-2", exerciseSlug: "rear-delt-fly", label: "Dumbbell Rear Delt Fly", sets: 3, reps: "12" },
          ],
        },
        {
          id: "thursday-arms",
          title: "Arms",
          exercises: [
            { id: "thursday-arms-1", exerciseSlug: "skull-crushers", label: "Skull Crushers", sets: 3, reps: "10" },
            { id: "thursday-arms-2", exerciseSlug: "hammer-curl", label: "Hammer Curls", sets: 3, reps: "12" },
          ],
        },
        {
          id: "thursday-forearms-traps",
          title: "Forearms / Traps",
          exercises: [
            { id: "thursday-forearms-traps-1", exerciseSlug: "farmers-carry", label: "Farmer's Carries", sets: 2, reps: "30 sec" },
            { id: "thursday-forearms-traps-2", exerciseSlug: "upright-row", label: "Upright Rows", sets: 3, reps: "10" },
          ],
        },
        {
          id: "thursday-finisher",
          title: "Finisher (5 min)",
          exercises: [
            { id: "thursday-finisher-1", label: "Light push/pull superset", sets: null, reps: "5 min" },
          ],
        },
      ],
    },
    {
      id: "friday",
      day: "Friday",
      focus: "Abs + Full Body + Conditioning",
      sections: [
        {
          id: "friday-warmup",
          title: "Warm-Up (5 min)",
          exercises: [
            { id: "friday-warmup-1", label: "Stairmaster or jump rope", sets: null, reps: "5 min" },
          ],
        },
        {
          id: "friday-abs",
          title: "Abs",
          exercises: [
            { id: "friday-abs-1", exerciseSlug: "cable-crunch", label: "Cable Crunch", sets: 3, reps: "12" },
            { id: "friday-abs-2", exerciseSlug: "hanging-leg-raise", label: "Hanging Leg Raises", sets: 3, reps: "10" },
            { id: "friday-abs-3", exerciseSlug: "decline-sit-up", label: "Decline Sit-Ups", sets: 3, reps: "12" },
            { id: "friday-abs-4", exerciseSlug: "plank", label: "Plank", sets: 1, reps: "1 min" },
          ],
        },
        {
          id: "friday-full-body",
          title: "Full Body",
          exercises: [
            { id: "friday-full-body-1", exerciseSlug: "kettlebell-swing", label: "Kettlebell Swings", sets: 3, reps: "15" },
            { id: "friday-full-body-2", exerciseSlug: "cable-woodchopper", label: "Cable Woodchoppers", sets: 3, reps: "12 each side" },
          ],
        },
        {
          id: "friday-finisher",
          title: "Finisher (5 min)",
          exercises: [
            { id: "friday-finisher-1", label: "HIIT Intervals", sets: null, reps: "20s on / 20s off x 5 rounds" },
          ],
        },
      ],
    },
  ],
};
