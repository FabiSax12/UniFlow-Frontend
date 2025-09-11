import { Fragment } from "react/jsx-runtime";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Home } from "lucide-react";
import { Link } from "@tanstack/react-router";

const formatSegmentName = (segment: string) => {
  return segment
    .replace(/[-_]/g, ' ') // Reemplaza guiones y guiones bajos con espacios
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Separa camelCase
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};


interface Props {
  location?: { pathname: string }; // Objeto location opcional
  path?: string; // Path opcional si no se usa location
  homeLabel?: string; // Etiqueta para el enlace de inicio
  showHome?: boolean; // Mostrar o no el enlace de inicio
  maxItems?: number | null; // Número máximo de items a mostrar
  className?: string; // Clases CSS adicionales
  separator?: React.ReactNode; // Separador personalizado
  formatLabel?: (segment: string) => string; // Función para formatear etiquetas
}

export const CustomBreadcrumb = ({
  location,
  path,
  homeLabel = "Home",
  showHome = true,
  maxItems = null,
  className = "",
  separator = null,
  formatLabel = formatSegmentName
}: Props) => {
  // Obtener el path del location o usar el path directamente
  const currentPath = location?.pathname || path || '/';

  // Dividir el path en segmentos y filtrar vacíos
  const segments = currentPath.split('/').filter(Boolean);

  // Crear los breadcrumb items
  type BreadcrumbItemType = {
    label: string;
    path: string | null;
    isHome?: boolean;
    isEllipsis?: boolean;
  };

  const breadcrumbItems: BreadcrumbItemType[] = [];

  // Agregar Home si está habilitado
  if (showHome) {
    breadcrumbItems.push({
      label: homeLabel,
      path: '/',
      isHome: true
    });
  }

  // Agregar segmentos del path
  segments.forEach((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    breadcrumbItems.push({
      label: formatLabel(segment),
      path: path,
      isHome: false
    });
  });

  // Aplicar límite máximo de items si está especificado
  let displayItems = breadcrumbItems;

  if (maxItems && breadcrumbItems.length > maxItems) {
    const start = breadcrumbItems.slice(0, 1); // Home
    const end = breadcrumbItems.slice(-maxItems + 1); // Últimos items
    displayItems = [
      ...start,
      { label: '...', path: null, isEllipsis: true },
      ...end
    ];
  }

  const currentFullPath = currentPath;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isActive = item.path === currentFullPath;

          return (
            <Fragment key={item.path || `ellipsis-${index}`}>
              <BreadcrumbItem>
                {item.isEllipsis ? (
                  <span className="text-muted-foreground">...</span>
                ) : isLast || isActive ? (
                  <span className="text-foreground font-medium">
                    {item.isHome ? <Home className="h-4 w-4" /> : item.label}
                  </span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.path ?? undefined}>
                      {item.isHome ? <Home className="h-4 w-4" /> : item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator>
                  {separator}
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};