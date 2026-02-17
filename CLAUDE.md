# Project-Specific Claude Instructions

## Lessons Learned

### CSS Modal Positioning (2024)

**Problem**: When trying to reposition an absolutely positioned modal from appearing above its trigger (`bottom: calc(100% + spacing)`) to appearing below (`top: calc(100% + spacing)`), the modal's height collapsed to 0px even though content existed inside.

**What didn't work**:
- Setting `bottom: auto` and `top: calc(...)` to flip position
- Adding `height: auto`, `min-height: fit-content`, `display: block`
- Using `!important` to force overrides
- Explicitly re-declaring `background-color` and `padding`

**What worked**:
- Removing all custom overrides and using the existing working styles (positioning above instead of below)

**Key takeaway**: When fighting CSS positioning issues, prefer reusing existing working patterns over creating custom overrides. The base `.explanation` class in this project positions modals above their triggers - trying to flip this with simple property overrides caused cascading issues with transforms and height calculations. If positioning below is truly needed, it may require a separate class with its own complete set of positioning rules rather than trying to override specific properties.

**Recommendation**: For any new modals, use the existing `.explanation` class pattern (modal appears above trigger). Don't try to flip positioning direction with partial overrides.
