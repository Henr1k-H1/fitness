export const formatTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

export const muscleNumberToName = (number) => {
  switch (Number(number.$numberInt)) {
    case 1:
      return "Abs";
    case 2:
      return "Back";
    case 3:
      return "Biceps";
    case 4:
      return "Calves";
    case 5:
      return "Chest";
    case 6:
      return "Glutes";
    case 7:
      return "Hamstrings";
    case 8:
      return "Quadriceps";
    case 9:
      return "Shoulders";
    case 10:
      return "Triceps";
    case 11:
      return "Trapezius";
    case 12:
      return "Lower Back";
    case 13:
      return "Abductors";
    case 14:
      return "Adductors";
    case 15:
      return "Forearms";
    case 16:
      return "Neck";
    default:
      return "Other";
  }
};

export const equipmentumberToName = (number) => {
  switch (Number(number.$numberInt)) {
    case 0:
      return "Barbell";
    case 1:
      return "Dumbbell";
    case 2:
      return "EZ-Bar";
    case 3:
      return "Kettlebell";
    case 4:
      return "Trap Bar";
    case 5:
      return "Bench Press Machine";
    case 6:
      return "Biceps Curl Machine";
    case 7:
      return "Calf Press Machine";
    case 8:
      return "Fly Machine";
    case 9:
      return "Hack Squat Machine";
    case 10:
      return "Leg Curl Machine";
    case 11:
      return "Leg Extension Machine";
    case 12:
      return "Leg PRess Machine";
    case 13:
      return "Preacher Curl Machine";
    case 14:
      return "Row Machine";
    case 15:
      return "Shoulder Press Machine";
    case 16:
      return "Shoulder Shrug Machine";
    case 17:
      return "Squat Machine";
    case 18:
      return "Hip Adductor Machine";
    case 19:
      return "Thigh Adductor Machine";
    case 20:
      return "Triceps Extension Machine";
    case 21:
      return "Freemotion Machine";
    case 22:
      return "Hammerstrength Machine";
    case 23:
      return "Smith Machine";
    case 24:
      return "Crossover Cable";
    case 25:
      return "Hi-Lo Pulley Cable";
    case 26:
      return "Lat Pulldown Cable";
    case 27:
      return "Rope Cable";
    case 28:
      return "Row Cable";
    case 29:
      return "Back Extension Bench";
    case 30:
      return "Decline Bench";
    case 31:
      return "Glute Ham Raise Bench";
    case 32:
      return "Preacher Curl Bench";
    case 33:
      return "Reverse Hyper Bench";
    case 34:
      return "Vertical Bench";
    case 35:
      return "Dip Bar";
    case 36:
      return "Parallette Bars";
    case 37:
      return "Pull Up Bar";
    case 38:
      return "Mini Loop Bands";
    case 39:
      return "Box";
    case 40:
      return "Cone";
    case 41:
      return "Farmer's Walk Handles";
    case 42:
      return "Medicine Ball";
    case 43:
      return "Rings";
    case 44:
      return "Rope";
    case 45:
      return "Sled";
    case 46:
      return "Exercise Ball";
    case 47:
      return "T-Bar";
    case 48:
      return "Tire";
    case 49:
      return "TRX";
    case 50:
      return "Yoke";
    case 51:
      return "Human Body";
    case 52:
      return "Flat Bench";
    case 53:
      return "Incline Bench";
    case 54:
      return "Squat Rack";
    case 55:
      return "Balance Trainer";
    case 56:
      return "Ab Crunch Machine";
    case 57:
      return "Back Extension Machine";
    case 58:
      return "Assisted Weight Machine";
    case 59:
      return "Triceps Dip Machine";
    case 60:
      return "Leg Press";
    case 61:
      return "Battle Ropes";
    case 62:
      return "Glute Kickback Machine";
    case 63:
      return "Foam Roll";
    case 64:
      return "Ab Wheel";
    case 65:
      return "PVC Pipe";
    case 67:
      return "Loop Band";
    case 68:
      return "Handle Bands";
    default:
      return "Other";
  }
};

//import { equipmentumberToName } from './Utils';
