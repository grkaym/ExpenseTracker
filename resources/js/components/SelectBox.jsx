import * as Select from '@radix-ui/react-select';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';

export default function SelectBox({
  optionArray,
  id,
  value = '',
  onChange,
  className = '',
  itemClassName = '',
}) {
  // Get state of the selected value
  const [val, setVal] = useState(optionArray[0].value ?? '');

  // Reflect changing date value by the parent
  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <Select.Root
      defaultValue={val}
      onValueChange={(v) => {
        setVal(v);
        onChange(v);
      }}
    >
      <Select.Trigger
        className={
          `inline-flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-1.5 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus-visible:border-amber-500 focus-visible:ring-amber-500 ` +
          className
        }
        id={id}
      >
        <Select.Value />
        <Select.Icon>
          <CaretDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="rounded-lg border border-slate-300 bg-white">
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Group>
              {optionArray.map((e, index) => {
                return (
                  <Select.Item
                    key={index}
                    value={e.value}
                    className={
                      `relative flex cursor-pointer select-none items-center gap-2 rounded p-2 text-sm outline-none data-[highlighted]:bg-amber-100 data-[state=checked]:bg-amber-200 data-[highlighted]:text-amber-800 data-[state=checked]:text-amber-900 ` +
                      itemClassName
                    }
                  >
                    <Select.ItemText>{e.label}</Select.ItemText>
                  </Select.Item>
                );
              })}
            </Select.Group>
            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
