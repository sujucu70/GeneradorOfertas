# Calculadora de Pricing Beyond Ops

## Modelo de Pricing

### Principios de Pricing

1. **Transparencia**: Desglose claro de costes y fees
2. **Basado en valor**: Pricing ligado a impacto operativo
3. **Escalable**: Crece con volumen, pero con economías de escala
4. **Predecible**: Cliente sabe qué paga y por qué

---

## 1. OpsFocus (M0)

### Modelo de Cotización: **One-shot basado en horas**

#### Inputs
- **Jornadas de analítica**: [X jornadas]
- **Jornadas de consultoría senior**: [Y jornadas]
- **Número de procesos a analizar**: [Z procesos]

#### Tarifas Base (EUR)
- **Analista**: €800/jornada
- **Consultor Senior**: €1,200/jornada
- **Director**: €1,500/jornada

#### Cálculo

```
Coste Base OpsFocus =
  (Jornadas Analítica × €800) +
  (Jornadas Consultoría Senior × €1,200) +
  (Jornadas Dirección × €1,500)
```

#### Fórmula de Jornadas Estimadas

```
Jornadas Analítica = 2 + (Procesos × 0.5)
Jornadas Consultoría = 1 + (Procesos × 0.3)
Jornadas Dirección = 1
```

#### Ejemplo
Para **10 procesos**:
- Jornadas Analítica: 2 + (10 × 0.5) = 7 jornadas
- Jornadas Consultoría: 1 + (10 × 0.3) = 4 jornadas
- Jornadas Dirección: 1 jornada

**Cálculo**:
```
(7 × €800) + (4 × €1,200) + (1 × €1,500) = €12,900
```

#### Rango de Precios Típico
- **Proyecto pequeño** (3-5 procesos): €8,000 - €12,000
- **Proyecto mediano** (6-10 procesos): €12,000 - €18,000
- **Proyecto grande** (11-20 procesos): €18,000 - €30,000

---

## 2. OpsIntelligence (M1-M3)

### Modelo de Cotización: **Por cápsula operativa**

#### Inputs por Cápsula
- **Complejidad de la cápsula**: Baja / Media / Alta
- **Número de integraciones**: [X integraciones]
- **Volumen mensual estimado**: [Y operaciones/mes]

#### Componentes de Coste

##### A. Desarrollo de Prototipos (M1-M3)

**Tarifas por Complejidad** (EUR):

| Complejidad | Jornadas Dev | Jornadas PMO | Coste Base |
|-------------|--------------|--------------|------------|
| **Baja** | 10-15 | 3-5 | €12,000 - €18,000 |
| **Media** | 15-25 | 5-8 | €18,000 - €30,000 |
| **Alta** | 25-40 | 8-12 | €30,000 - €50,000 |

##### B. Factores de Complejidad

**Integrations Multiplier**:
- 0-1 integraciones: 1.0x
- 2-3 integraciones: 1.15x
- 4-5 integraciones: 1.30x
- 6+ integraciones: 1.50x

**Volumen Multiplier** (para setup inicial):
- < 1,000 ops/mes: 1.0x
- 1,000 - 5,000 ops/mes: 1.1x
- 5,000 - 20,000 ops/mes: 1.2x
- 20,000+ ops/mes: 1.3x

#### Cálculo

```
Coste por Cápsula (OpsIntelligence) =
  Coste Base × Integration Multiplier × Volume Multiplier
```

#### Ejemplo 1: Cápsula de Complejidad Media
- Coste Base: €24,000
- Integraciones: 3 → Multiplier 1.15x
- Volumen: 3,000 ops/mes → Multiplier 1.1x

**Cálculo**:
```
€24,000 × 1.15 × 1.1 = €30,360
```

#### Ejemplo 2: Cápsula de Complejidad Alta
- Coste Base: €40,000
- Integraciones: 5 → Multiplier 1.30x
- Volumen: 15,000 ops/mes → Multiplier 1.2x

**Cálculo**:
```
€40,000 × 1.30 × 1.2 = €62,400
```

#### Descuento por Volumen de Cápsulas

Si se contratan múltiples cápsulas:
- 2-3 cápsulas: 5% descuento
- 4-5 cápsulas: 10% descuento
- 6+ cápsulas: 15% descuento

---

## 3. OpsScale (M4)

### Modelo de Cotización: **Por volumen + Fee mensual**

#### Componentes de Pricing

##### A. Fee Base por Tipología de Operación

**1. Voz (Voice)**

| Componente | Unidad | Coste Base | Fee Recomendado |
|------------|--------|------------|-----------------|
| **Voz Agentic** | Minuto | €0.15 - €0.25 | €0.30 - €0.50 |
| **Voz Humana** | Minuto | €0.80 - €1.20 | €1.50 - €2.50 |
| **Supervisión** | Minuto | €0.50 - €0.80 | €1.00 - €1.50 |

**2. Mensajería (Chat/Email/WhatsApp)**

| Componente | Unidad | Coste Base | Fee Recomendado |
|------------|--------|------------|-----------------|
| **Mensaje Agentic** | Mensaje | €0.10 - €0.20 | €0.25 - €0.40 |
| **Mensaje Humano** | Mensaje | €0.50 - €0.80 | €1.00 - €1.50 |
| **Supervisión** | Mensaje | €0.20 - €0.40 | €0.40 - €0.70 |

**3. Transacciones (Backoffice)**

| Componente | Unidad | Coste Base | Fee Recomendado |
|------------|--------|------------|-----------------|
| **Transacción Simple** | Operación | €0.50 - €1.00 | €1.00 - €2.00 |
| **Transacción Media** | Operación | €1.50 - €3.00 | €3.00 - €5.00 |
| **Transacción Compleja** | Operación | €3.00 - €6.00 | €6.00 - €10.00 |

##### B. Fee de Plataforma (Mensual)

Base según volumen total:

| Volumen Mensual | Fee Plataforma |
|-----------------|----------------|
| < 5,000 operaciones | €2,000 - €3,000 |
| 5,000 - 20,000 ops | €3,000 - €6,000 |
| 20,000 - 50,000 ops | €6,000 - €10,000 |
| 50,000 - 100,000 ops | €10,000 - €15,000 |
| 100,000+ ops | €15,000+ |

**Incluye**:
- Infraestructura tecnológica
- Licencias de herramientas
- Mantenimiento técnico
- Soporte 24/7
- Dashboard y reporting

##### C. Fee de Dirección/PMO (Mensual)

| Nivel de Servicio | Fee Mensual |
|-------------------|-------------|
| **Básico** (1 comité/mes) | €2,000 - €3,000 |
| **Estándar** (2 comités/mes + reporting semanal) | €3,000 - €5,000 |
| **Premium** (4 comités/mes + reporting diario) | €5,000 - €8,000 |

---

#### Cálculo de Fee Mensual OpsScale

```
Fee Mensual Total =
  (Volumen Voz Agentic × Fee/min) +
  (Volumen Voz Humana × Fee/min) +
  (Volumen Mensajes Agentic × Fee/mensaje) +
  (Volumen Mensajes Humano × Fee/mensaje) +
  (Volumen Transacciones × Fee/transacción) +
  Fee Plataforma +
  Fee Dirección/PMO
```

#### Ejemplo de Cálculo

**Inputs**:
- Voz Agentic: 5,000 minutos/mes
- Voz Humana: 1,000 minutos/mes
- Mensajes Agentic: 10,000 mensajes/mes
- Mensajes Humano: 2,000 mensajes/mes
- Transacciones Simples: 3,000 ops/mes
- Volumen Total: ~21,000 operaciones

**Fees aplicados** (rango medio):
- Voz Agentic: €0.40/min
- Voz Humana: €2.00/min
- Mensaje Agentic: €0.30/mensaje
- Mensaje Humano: €1.25/mensaje
- Transacción Simple: €1.50/op
- Fee Plataforma: €7,000 (para ~21k ops)
- Fee PMO: €4,000 (estándar)

**Cálculo**:
```
(5,000 × €0.40) = €2,000      (Voz Agentic)
(1,000 × €2.00) = €2,000      (Voz Humana)
(10,000 × €0.30) = €3,000     (Mensajes Agentic)
(2,000 × €1.25) = €2,500      (Mensajes Humano)
(3,000 × €1.50) = €4,500      (Transacciones)
                   €7,000      (Fee Plataforma)
                   €4,000      (Fee PMO)
─────────────────────────────
TOTAL MENSUAL:    €25,000
TOTAL ANUAL:      €300,000
```

---

#### Tabla de Excesos

**Definición de exceso**: Volumen que supera en >10% el volumen base contratado

**Fee de exceso**: +20% sobre tarifa base

| Tipo de Operación | Fee Base | Fee Exceso |
|-------------------|----------|------------|
| Voz Agentic | €0.40/min | €0.48/min |
| Voz Humana | €2.00/min | €2.40/min |
| Mensaje Agentic | €0.30/msg | €0.36/msg |
| Mensaje Humano | €1.25/msg | €1.50/msg |
| Transacción Simple | €1.50/op | €1.80/op |

**Ejemplo**:
- Volumen base contratado: 10,000 mensajes agentic
- Rango sin exceso: 9,000 - 11,000 mensajes (±10%)
- Mes real: 12,000 mensajes
- **Cálculo**:
  - 11,000 mensajes × €0.30 = €3,300
  - 1,000 mensajes (exceso) × €0.36 = €360
  - **Total**: €3,660

---

#### Descuentos por Volumen Anual

Si se compromete contrato anual:
- 10,000 - 30,000 ops/mes: 5% descuento
- 30,000 - 100,000 ops/mes: 10% descuento
- 100,000+ ops/mes: 15% descuento

Aplicado sobre fee de operaciones (no sobre fee plataforma ni PMO)

---

## 4. Comparativa con Modelo Tradicional

### Benchmark: BPO Tradicional vs. Beyond OpsScale

| Concepto | BPO Tradicional | Beyond OpsScale | Ahorro |
|----------|-----------------|-----------------|--------|
| **Coste por minuto voz** | €2.50 - €3.50 | €0.30 - €2.50 (blended) | 30-60% |
| **Coste por mensaje** | €1.50 - €2.00 | €0.25 - €1.50 (blended) | 40-70% |
| **Setup inicial** | €50k - €100k | OpsFocus + OpsInt | Variable |
| **Tiempo a producción** | 6-12 meses | 2-3 meses | 50-75% |
| **Flexibilidad de volumen** | Baja (contratos rígidos) | Alta (tabla de excesos) | ✓ |
| **Visibilidad de KPIs** | Reporting mensual | Dashboard real-time | ✓ |

---

## 5. Configuración de Margen

### Estructura de Costes

**Coste Base** incluye:
- Personal operativo (agentes, supervisores)
- Infraestructura tecnológica
- Licencias de software
- Overhead operativo (15-20%)

**Margen Recomendado**:
- OpsFocus: 30-40% sobre coste base
- OpsIntelligence: 35-45% sobre coste base
- OpsScale: 40-50% sobre coste base (operación recurrente)

### Configurador de Margen (para herramienta)

Permitir ajustar margen entre:
- **Mínimo viable**: 20% (proyectos estratégicos)
- **Estándar**: 40% (mayoría de proyectos)
- **Premium**: 60% (clientes de alto valor)

---

## 6. Packaging de Ofertas

### Package 1: "Exploratory"
**Incluye**: Solo OpsFocus
**Precio**: €8,000 - €15,000
**Ideal para**: Clientes indecisos, primeros proyectos

### Package 2: "Pilot"
**Incluye**: OpsFocus + OpsIntelligence (1 cápsula)
**Precio**: €25,000 - €40,000
**Ideal para**: Validación rápida, POC

### Package 3: "Scale"
**Incluye**: OpsFocus + OpsIntelligence (3 cápsulas) + OpsScale (6 meses)
**Precio**: €150,000 - €250,000
**Ideal para**: Implementación completa

### Package 4: "Enterprise"
**Incluye**: OpsFocus + OpsIntelligence (5+ cápsulas) + OpsScale (12 meses)
**Precio**: €300,000 - €500,000+
**Ideal para**: Transformación operativa completa

---

## 7. Herramienta: Inputs Requeridos

Para generar pricing automático, la herramienta debe recoger:

### Para OpsFocus
- [ ] Número de procesos a analizar
- [ ] Complejidad estimada (automático desde análisis)

### Para OpsIntelligence
- [ ] Número de cápsulas aprobadas
- [ ] Complejidad por cápsula (Baja/Media/Alta)
- [ ] Número de integraciones por cápsula
- [ ] Volumen mensual estimado por cápsula

### Para OpsScale
- [ ] Volumen mensual por tipo:
  - Minutos de voz (agentic / humano)
  - Número de mensajes (agentic / humano)
  - Número de transacciones (simple / media / compleja)
- [ ] Nivel de servicio de PMO (Básico/Estándar/Premium)
- [ ] Duración del contrato (meses)

### Configuración
- [ ] Margen deseado (20-60%)
- [ ] Descuentos aplicables (%)
- [ ] Tipo de cliente (Exploratory/Pilot/Scale/Enterprise)

---

## 8. Output de la Calculadora

### Anexo Económico Generado

Debe incluir:

1. **Resumen de Inversión**
   - OpsFocus: €X
   - OpsIntelligence: €Y (desglose por cápsula)
   - OpsScale: €Z/mes (€W/año)
   - **Total Año 1**: €Total

2. **Desglose OpsScale Mensual**
   - Tabla con volúmenes × fees
   - Fee plataforma
   - Fee PMO
   - Total mensual

3. **Tabla de Excesos**
   - Volumen base por tipo de operación
   - Rango sin exceso (±10%)
   - Fee de exceso (+20%)

4. **Comparativa con Modelo Tradicional**
   - Coste BPO tradicional estimado
   - Coste Beyond OpsScale
   - Ahorro anual
   - Payback

5. **Condiciones Comerciales**
   - Facturación
   - Forma de pago
   - Ajustes de volumen
   - Cláusulas de salida

---

## 9. Notas de Uso

### Calibración de Tarifas
- Revisar tarifas trimestralmente según costes reales
- Ajustar según geografía (si aplica)
- Considerar cambios en costes de tecnología (LLMs)

### Excepciones
- Clientes estratégicos: margen reducido aprobado por dirección
- Proyectos piloto: pricing especial one-time
- Volúmenes muy altos (>200k ops/mes): pricing custom

### Validaciones
- Nunca pricing por debajo de coste base
- Margen mínimo 20%
- Comparativa con mercado siempre incluida
- ROI del cliente debe ser >2x la inversión
