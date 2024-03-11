type ClassAttribute = {
  name: string;
  color: string;
  classId: number;
  value: string;
};

type ClassAttributes = {
  [key: number]: ClassAttribute;
};

export const classAttr: ClassAttributes = {
  0: {
    name: "Elbow positive",
    color: "#3D9BE9",
    classId: 0,
    value: "elbow_positive",
  },
  1: {
    name: "Finger positive",
    color: "#BADA55",
    classId: 1,
    value: "fingers_positive",
  },
  2: {
    name: "Humerus",
    color: "#2CE1CB",
    classId: 2,
    value: "humerus",
  },
  3: {
    name: "Forearm fracture",
    color: "#FFD75C",
    classId: 3,
    value: "forearm_fracture",
  },
  4: {
    name: "Humerus fracture",
    color: "#F25858",
    classId: 4,
    value: "humerus_fracture",
  },
  5: {
    name: "Shoulder fracture",
    color: "#F25858",
    classId: 5,
    value: "shoulder_fracture",
  },
  6: {
    name: "Wrist positive",
    color: "#D783FF",
    classId: 6,
    value: "wrist_positive",
  },
};

export const classes = [
  "elbow_positive",
  "fingers_positive",
  "humerus",
  "forearm_fracture",
  "humerus_fracture",
  "shoulder_fracture",
  "wrist_positive",
  "none",
];

export const selection = [
  {
    tab: 1,
    label: "Select all",
  },
  {
    tab: 2,
    label: "Deselect all",
  },
];

export const menus = [
  {
    tab: 1,
    label: "All groups",
  },
  {
    tab: 2,
    label: "Train",
  },
  {
    tab: 3,
    label: "Valid",
  },
  {
    tab: 4,
    label: "Test",
  },
];

export const classFilterButtons = [
  {
    label: "Elbow positive",
    btnColor: "custom-button-class",
    btnName: "elbow_positive",
  },
  {
    label: "Fingers positive",
    btnColor: "btn-success",
    btnName: "fingers_positive",
  },
  {
    label: "Humerus",
    btnColor: "btn-secondary",
    btnName: "humerus",
  },
  {
    label: "Forearm fracture",
    btnColor: "btn-warning",
    btnName: "forearm_fracture",
  },
  {
    label: "Humerus fracture",
    btnColor: "btn-danger",
    btnName: "humerus_fracture",
  },
  {
    label: "Shoulder fracture",
    btnColor: "btn-warning2",
    btnName: "shoulder_fracture",
  },
  {
    label: "Wrist positive",
    btnColor: "btn-secondary2",
    btnName: "wrist_positive",
  },
];
