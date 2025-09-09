import * as Select from '@radix-ui/react-select';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { memo } from 'react';

function SelectBoxImpl({
  optionArray,
  groupedOptionArray,
  id,
  value = '',
  onChange,
  className = '',
  itemClassName = '',
  defaultValue = '',
}) {
  // Get state of the selected value
  const [val, setVal] = useState(defaultValue ?? '');

  // // Classify options by type
  const grouped = groupedOptionArray?.reduce((acc, cur) => {
    // Insert new array if cur.type doesn't exist in the acc
    !acc[cur.type] && (acc[cur.type] = []);
    acc[cur.type].push(cur);
    return acc;
  }, {});

  // Reflect changing date value by the parent
  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <Select.Root
      defaultValue={val}
      onValueChange={(v) => {
        setVal(v);
        onChange && onChange(v);
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
        <Select.Content className="rounded-lg border border-slate-300 bg-white p-2">
          <Select.ScrollUpButton />
          <Select.Viewport className="space-y-2">
            {groupedOptionArray
              ? Object.entries(grouped).map(([type, items], i, arr) => {
                  return (
                    <>
                      <Select.Group key={type}>
                        <Select.Label className="text-sm text-slate-500">
                          {type}
                        </Select.Label>
                        {items.map((item) => {
                          return (
                            <Select.Item
                              key={item.value}
                              value={item.value}
                              className={
                                `relative flex cursor-pointer select-none items-center gap-2 rounded p-2 text-sm outline-none data-[highlighted]:bg-amber-100 data-[state=checked]:bg-amber-200 data-[highlighted]:text-amber-800 data-[state=checked]:text-amber-900 ` +
                                itemClassName
                              }
                            >
                              <Select.ItemText>{item.label}</Select.ItemText>
                            </Select.Item>
                          );
                        })}
                      </Select.Group>
                      {i < arr.length - 1 && (
                        <Select.Separator className="h-[1px] bg-slate-200" />
                      )}
                    </>
                  );
                })
              : optionArray.map((e) => {
                  return (
                    <Select.Item
                      key={e.value}
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
            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

// Re-render only when props change
const SelectBox = memo(SelectBoxImpl);
export default SelectBox;
