import { Toaster as Sonner } from 'sonner';
import { useTheme } from '../theme/theme-provider';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      richColors
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster };
