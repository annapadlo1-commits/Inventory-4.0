/**
 * Inventory PRO 4.3.2
 * Konfiguracja PAWILONÓW z release gate dla kontraktu formuł.
 */
function enterpriseSetup() {
  const startedAt = Date.now();

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    invalidateProductCatalogCache_();

    getOrCreateBusinessHistorySheet_();
    ensureTechnicalLogHeaders_(getOrCreateTechnicalLogSheet_());
    getOrCreateTechnicalHistorySheet_();
    ensureQualitySettingsSheet_();
    getOrCreateNewProductsSheet_();
    ensureActiveInventorySession_();

    const formulaAuditBefore = auditInventoryFormulaCoverage_();
    writeInventoryFormulaAuditReport_(formulaAuditBefore);
    if (
      formulaAuditBefore.hasBlockingConflicts &&
      (!CONFIG.FORMULA_POLICY || CONFIG.FORMULA_POLICY.BLOCK_SETUP_ON_CONFLICT !== false)
    ) {
      throw new Error(
        'Enterprise Setup zablokowany: wykryto ' + formulaAuditBefore.conflictFormulaCells +
        ' konfliktowych komórek formuł. Sprawdź ukrytą zakładkę „' +
        CONFIG.SHEETS.FORMULA_AUDIT + '”. Przykłady: ' +
        formatFormulaConflictCells_(formulaAuditBefore, 8) + '.'
      );
    }

    const formulaRepair = formulaAuditBefore.safe
      ? { changedCells: 0, backupSheetName: '', audit: formulaAuditBefore }
      : repairInventoryFormulas_({
          createBackup: !CONFIG.FORMULA_POLICY || CONFIG.FORMULA_POLICY.CREATE_BACKUP_BEFORE_REPAIR !== false,
          source: 'enterpriseSetup',
          failOnConflicts: true,
          requireFullySafe: true,
          audit: formulaAuditBefore
        });

    repairDictionaryCategoriesFromInventory();
    applyInventoryTheme();
    applySavedWorkspaceMode();

    const validation = buildValidationReport_();
    if (!validation.valid) {
      throw new Error('Enterprise Setup zakończył się błędami walidacji:\n- ' + validation.errors.join('\n- '));
    }

    const result = {
      success: true,
      version: CONFIG.VERSION,
      repairedFormulaCells: formulaRepair.changedCells,
      formulaBackupSheet: formulaRepair.backupSheetName,
      formulasSafe: formulaRepair.audit && formulaRepair.audit.safe,
      validationWarnings: validation.warnings.length,
      durationMs: Date.now() - startedAt
    };

    logInfo(
      'EnterpriseSetup',
      'enterpriseSetup',
      'Inventory PRO ' + CONFIG.VERSION + ' został zainicjalizowany',
      {
        spreadsheetName: spreadsheet.getName(),
        spreadsheetId: spreadsheet.getId(),
        repairedFormulaCells: result.repairedFormulaCells,
        formulaBackupSheet: result.formulaBackupSheet,
        formulasSafe: result.formulasSafe,
        validationWarnings: result.validationWarnings
      },
      result.durationMs
    );

    spreadsheet.toast(
      'PAWILONY v' + CONFIG.VERSION + ' gotowe.',
      'Inventory PRO',
      8
    );
    return result;
  } catch (error) {
    try {
      logError(
        'EnterpriseSetup',
        'enterpriseSetup',
        error,
        null,
        Date.now() - startedAt
      );
    } catch (loggingError) {
      console.error(loggingError);
    }
    throw error;
  }
}
