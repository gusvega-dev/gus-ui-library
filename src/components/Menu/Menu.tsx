import React from 'react';

interface MenuOption {
  label: string;
  value: string;
  onClick?: () => void;
  divider?: boolean;
}

interface MenuProps {
  trigger: React.ReactNode;
  options: MenuOption[];
}

export function Menu({ trigger, options }: MenuProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative inline-block">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full left-0 z-50 bg-white border border-neutral-200 rounded-lg shadow-lg mt-1 min-w-48">
            {options.map((opt, idx) => (
              <React.Fragment key={idx}>
                {opt.divider ? (
                  <div className="border-t border-neutral-200" />
                ) : (
                  <button
                    onClick={() => {
                      opt.onClick?.();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors text-sm"
                  >
                    {opt.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
