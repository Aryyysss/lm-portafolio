# UT05 · Inventario de red del aula en XML, XSD y JSON

Ejercicio de la unidad 5 de 0373 LM: estructurar y validar datos con XML.

## Ficheros

| Fichero | Contenido |
|---|---|
| `inventario.xml` | 6 equipos de red del aula (router, switch, punto de acceso, 2 servidores, impresora) |
| `inventario.xsd` | Esquema: `xs:pattern` para id, IP y MAC, `xs:date` para las fechas, enumeración de tipos, mínimo 5 equipos e id/IP únicas |
| `inventario.json` | Los mismos datos en JSON |

## Validación

```
xmllint --noout --schema inventario.xsd inventario.xml
inventario.xml validates
```

Prueba de rechazo: con la IP `192.168.10.300`, el esquema da el error
`[facet 'pattern'] The value '192.168.10.300' is not accepted by the pattern`.

## Criterio atributo / elemento

- **Atributos**: `id` y `tipo` del equipo, que lo identifican y clasifican, y `aula`, `centro` y `actualizado` del inventario.
- **Elementos**: los datos del equipo (modelo, IP, MAC, ubicación, fecha de compra) y los opcionales `puertos` y `sistema`.

## Comparativa

| Aspecto | XML | JSON |
|---|---|---|
| Tamaño (formateado) | 1888 B | 1623 B |
| Tipos | Todo es texto; los tipos los pone el XSD | Número nativo (`puertos`) |
| Validación | XSD con patrones de IP y MAC y fechas | Necesita JSON Schema aparte |
| Lectura | Más verboso | Directo con `JSON.parse` o `jq` |

**Formato para exportar a una herramienta de monitorización: JSON.** Las herramientas
actuales (Zabbix, Prometheus/Grafana, Netbox…) trabajan con APIs REST que intercambian JSON.
El JSON es más ligero y se procesa directamente con scripts. El XML con su XSD lo dejaría
para guardar el inventario como documento oficial validado.
