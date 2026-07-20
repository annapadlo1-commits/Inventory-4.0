function testRecoveryDictionaryContaminationGuard_() {
  const fake = {
    getLastRow: () => 4,
    getRange: () => ({ getDisplayValues: () => [['Amaro Lucano 1L'], ['function broken() {'], ['Campari 0,7 l']] })
  };
  const issues = detectDictionaryCodeContamination_(fake);
  if (issues.length !== 1 || issues[0].row !== 3) {
    throw new Error('Guard SLOWNIK nie wykrył kontrolnego fragmentu kodu.');
  }
  return true;
}

function testFormulaRepairRejectsDictionarySheet_() {
  let blocked = false;
  try {
    assertFormulaRepairTargetIsInventory_({ getName: () => CONFIG.SHEETS.DICTIONARY });
  } catch (error) {
    blocked = true;
  }
  if (!blocked) throw new Error('Naprawa formuł nie zablokowała arkusza SLOWNIK.');
  return true;
}
