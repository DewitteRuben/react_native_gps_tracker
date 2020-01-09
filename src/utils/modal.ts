interface ModalButtons {
  label: string;
  callback: () => void;
}

const getModalButtons = (...args: ModalButtons[]) => {
  return args.map(arg => ({
    onPress: arg.callback,
    text: arg.label,
    style: { width: `${Math.floor(100 / args.length) - 5}%`, paddingVertical: 15 }
  }));
};

export { getModalButtons, ModalButtons };
