import { useRef, useEffect } from 'react';

export default function EditableField({ value, onChange, tag: Tag = 'span', className, style, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      ref.current.innerText = value ?? '';
    }
  }, [value]);

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={e => onChange && onChange(e.currentTarget.innerText)}
      className={className}
      style={style}
      {...props}
    />
  );
}
