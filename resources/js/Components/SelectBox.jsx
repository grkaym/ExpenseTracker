import * as Select from "@radix-ui/react-select";
import { CaretDownIcon } from "@radix-ui/react-icons";

export default function SelectBox({ className = '', optionArray, ...props }) {
    return (
        <Select.Root defaultValue={optionArray[0].value}>
            <Select.Trigger
                className='inline-flex items-center gap-2 px-2 py-1 ml-2 border rounded border-slate-200 focus:border-amber-500 focus:outline-none'
            >
                <Select.Value />
                <Select.Icon><CaretDownIcon /></Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className="bg-white border rounded border-slate-300">
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                        <Select.Group>
                            {optionArray.map( (e, index) => {
                                return (
                                    <Select.Item
                                        key={index}
                                        value={e.value}
                                        className="relative flex cursor-pointer select-none items-center gap-2 rounded p-2 text-sm outline-none
                                                data-[highlighted]:bg-amber-100 data-[highlighted]:text-amber-800
                                                data-[state=checked]:bg-amber-200 data-[state=checked]:text-amber-900"
                                    >
                                        <Select.ItemText>
                                            {e.label}
                                        </Select.ItemText>
                                    </Select.Item>
                                )
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