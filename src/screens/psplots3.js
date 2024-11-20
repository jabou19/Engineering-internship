const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
const regression = require('regression');
// We should remove this token from the code in the future
const plotly = require('plotly')('Lukalop', 'U766kTpOnDN0FQNvEGXx');
const path = require('path')

async function readExcelData() {
  try {
    // Searching for absolute file path
    pathFile = path.resolve('eletrical_production_co2eq_js.xlsx');

    await workbook.xlsx.readFile(pathFile);

    const worksheet = workbook.getWorksheet('eletrical_production_co2eq');
    const data = [];

    // Define the specific row numbers (7 to 26) to read data from
    for (let rowNumber = 7; rowNumber <= 26; rowNumber++) {
      const yearCell = worksheet.getCell(`B${rowNumber}`);
      const siteEmissionsCell = worksheet.getCell(`E${rowNumber}`);
      const transportEmissionsCell = worksheet.getCell(`H${rowNumber}`);

      const year = yearCell.value - 2003; // Adjust years
      const siteEmissions = siteEmissionsCell.value;
      const transportEmissions = transportEmissionsCell.value;
      const totalEmissions = siteEmissions + transportEmissions;

      data.push([year, totalEmissions]);
    }

    // Now you have the data array with the required information

    // Fit a linear model
    const linearModel = regression.linear(data, { precision: 15 });

    // Fit a 2nd degree polynomial
    const poly2Model = regression.polynomial(data, { order: 2, precision: 15 });

    // Fit a 3rd degree polynomial
    const poly3Model = regression.polynomial(data, { order: 3, precision: 15 });

    // Fit an exponential function
    const expfit = regression.exponential(data, { precision: 15 });

    // Print fit statistics for linear fit
    printFitStatistics('Linear Fit', linearModel, data);

    // Print fit statistics for 2nd degree polynomial fit
    printFitStatistics('2nd Degree Polynomial Fit', poly2Model, data);

    // Print fit statistics for 3rd degree polynomial fit
    printFitStatistics('3rd Degree Polynomial Fit', poly3Model, data);

    // Print fit statistics for exponential fit
    printFitStatistics('Exponential Fit', expfit, data);

    // Print the coefficients of the linear fit
    console.log('Linear Fit Coefficients:', linearModel.equation);

    // Print the coefficients of the 2nd degree polynomial fit
    console.log('2nd Degree Polynomial Fit Coefficients:', poly2Model.equation);

    // Print the coefficients of the 3rd degree polynomial fit
    console.log('3rd Degree Polynomial Fit Coefficients:', poly3Model.equation);

    // Print the coefficients of the exponential fit
    console.log('Exponential Fit Coefficients:', expfit.equation);

    // Plot the data and fits
    plotDataAndFits(data, linearModel.points, poly2Model.points, poly3Model.points, expfit.points);

    // Define the intervals and names for area calculations
    const intervals = [
      { start: 3, end: 14, name: 'PS3_area' }, // Adjust years
      { start: 10, end: 17.2, name: 'PS4_area' }, // Adjust years
      { start: 17, end: 20, name: 'PS5_area' }, // Adjust years
      { start: 0, end: 11, name: 'PSP_area' }, // Adjust years
      { start: 7, end: 15, name: 'PSV_area' }, // Adjust years
    ];

    // Calculate and store the areas
    const calculatedAreas = calculateAreas(intervals, data, linearModel, poly2Model, poly3Model, expfit);
    console.log('Calculated Areas:', calculatedAreas);

    // Calculate area per year of release
    const PS3LinearFitArea_yr = calculatedAreas.PS3_area.LinearFit / 11; // Adjust years
    const PS3Poly2FitArea_yr = calculatedAreas.PS3_area.Poly2Fit / 11; // Adjust years
    const PS3Poly3FitArea_yr = calculatedAreas.PS3_area.Poly3Fit / 11; // Adjust years
    const PS3ExpFitArea_yr = calculatedAreas.PS3_area.ExponentialFit / 11; // Adjust years

    const PS4LinearFitArea_yr = calculatedAreas.PS4_area.LinearFit / 7.2; // Adjust years
    const PS4Poly2FitArea_yr = calculatedAreas.PS4_area.Poly2Fit / 7.2; // Adjust years
    const PS4Poly3FitArea_yr = calculatedAreas.PS4_area.Poly3Fit / 7.2; // Adjust years
    const PS4ExpFitArea_yr = calculatedAreas.PS4_area.ExponentialFit / 7.2; // Adjust years

    const PS5LinearFitArea_yr = calculatedAreas.PS5_area.LinearFit / 3; // Adjust years
    const PS5Poly2FitArea_yr = calculatedAreas.PS5_area.Poly2Fit / 3; // Adjust years
    const PS5Poly3FitArea_yr = calculatedAreas.PS5_area.Poly3Fit / 3; // Adjust years
    const PS5ExpFitArea_yr = calculatedAreas.PS5_area.ExponentialFit / 3; // Adjust years

    const PSPLinearFitArea_yr = calculatedAreas.PSP_area.LinearFit / 11; // Adjust years
    const PSPPoly2FitArea_yr = calculatedAreas.PSP_area.Poly2Fit / 11; // Adjust years
    const PSPPoly3FitArea_yr = calculatedAreas.PSP_area.Poly3Fit / 11; // Adjust years
    const PSPExpFitArea_yr = calculatedAreas.PSP_area.ExponentialFit / 11; // Adjust years

    const PSVLinearFitArea_yr = calculatedAreas.PSV_area.LinearFit / 8; // Adjust years
    const PSVPoly2FitArea_yr = calculatedAreas.PSV_area.Poly2Fit / 8; // Adjust years
    const PSVPoly3FitArea_yr = calculatedAreas.PSV_area.Poly3Fit / 8; // Adjust years
    const PSVExpFitArea_yr = calculatedAreas.PSV_area.ExponentialFit / 8; // Adjust years

    console.log('AREA', calculatedAreas.PS3_area.LinearFit, calculatedAreas.PS4_area.LinearFit, calculatedAreas.PS5_area.LinearFit, calculatedAreas.PSP_area.LinearFit, calculatedAreas.PSV_area.LinearFit)


    // Calculate CO2-eq relative to that of PS4
    const PS4_CO2_lin = 89;
    const PS4_CO2_pol2 = 89;
    const PS4_CO2_pol3 = 89;
    const PS4_CO2_exp = 89;

    const PS3_CO2_lin = PS3LinearFitArea_yr / PS4LinearFitArea_yr * PS4_CO2_lin;
    const PS3_CO2_pol2 = PS3Poly2FitArea_yr / PS4Poly2FitArea_yr * PS4_CO2_pol2;
    const PS3_CO2_pol3 = PS3Poly3FitArea_yr / PS4Poly3FitArea_yr * PS4_CO2_pol3;
    const PS3_CO2_exp = PS3ExpFitArea_yr / PS4ExpFitArea_yr * PS4_CO2_exp;

    const PS5_CO2_lin = PS5LinearFitArea_yr / PS4LinearFitArea_yr * PS4_CO2_lin;
    const PS5_CO2_pol2 = PS5Poly2FitArea_yr / PS4Poly2FitArea_yr * PS4_CO2_pol2;
    const PS5_CO2_pol3 = PS5Poly3FitArea_yr / PS4Poly3FitArea_yr * PS4_CO2_pol3;
    const PS5_CO2_exp = PS5ExpFitArea_yr / PS4ExpFitArea_yr * PS4_CO2_exp;

    const PSP_CO2_lin = PSPLinearFitArea_yr / PS4LinearFitArea_yr * PS4_CO2_lin;
    const PSP_CO2_pol2 = PSPPoly2FitArea_yr / PS4Poly2FitArea_yr * PS4_CO2_pol2;
    const PSP_CO2_pol3 = PSPPoly3FitArea_yr / PS4Poly3FitArea_yr * PS4_CO2_pol3;
    const PSP_CO2_exp = PSPExpFitArea_yr / PS4ExpFitArea_yr * PS4_CO2_exp;

    const PSV_CO2_lin = PSVLinearFitArea_yr / PS4LinearFitArea_yr * PS4_CO2_lin;
    const PSV_CO2_pol2 = PSVPoly2FitArea_yr / PS4Poly2FitArea_yr * PS4_CO2_pol2;
    const PSV_CO2_pol3 = PSVPoly3FitArea_yr / PS4Poly3FitArea_yr * PS4_CO2_pol3;
    const PSV_CO2_exp = PSVExpFitArea_yr / PS4ExpFitArea_yr * PS4_CO2_exp;


    // Add weight factor
    PS3_weight_fac_lin = 11 / 6.2 * (PS3_CO2_lin * 0.3); // Adjust years
    PS3_weight_fac_pol2 = 11 / 6.2 * (PS3_CO2_pol2 * 0.3); // Adjust years
    PS3_weight_fac_pol3 = 11 / 6.2 * (PS3_CO2_pol3 * 0.3); // Adjust years
    PS3_weight_fac_exp = 11 / 6.2 * (PS3_CO2_exp * 0.3); // Adjust years

    PS5_weight_fac_lin = 9.9 / 6.2 * (PS5_CO2_lin * 0.3); // Adjust years
    PS5_weight_fac_pol2 = 9.9 / 6.2 * (PS5_CO2_pol2 * 0.3); // Adjust years
    PS5_weight_fac_pol3 = 9.9 / 6.2 * (PS5_CO2_pol3 * 0.3); // Adjust years
    PS5_weight_fac_exp = 9.9 / 6.2 * (PS5_CO2_exp * 0.3); // Adjust years

    PSP_weight_fac_lin = 0.62 / 6.2 * (PSP_CO2_lin * 0.3); // Adjust years
    PSP_weight_fac_pol2 = 0.62 / 6.2 * (PSP_CO2_pol2 * 0.3); // Adjust years
    PSP_weight_fac_pol3 = 0.62 / 6.2 * (PSP_CO2_pol3 * 0.3); // Adjust years
    PSP_weight_fac_exp = 0.62 / 6.2 * (PSP_CO2_exp * 0.3); // Adjust years

    PSV_weight_fac_lin = 0.57 / 6.2 * (PSV_CO2_lin * 0.3); // Adjust years
    PSV_weight_fac_pol2 = 0.57 / 6.2 * (PSV_CO2_pol2 * 0.3); // Adjust years
    PSV_weight_fac_pol3 = 0.57 / 6.2 * (PSV_CO2_pol3 * 0.3); // Adjust years
    PSV_weight_fac_exp = 0.57 / 6.2 * (PSV_CO2_exp * 0.3); // Adjust years

    // Final Calculation of CO2-eq values
    PS3_CO2_lin_fin = PS3_CO2_lin * 0.7 + PS3_weight_fac_lin;
    PS3_CO2_pol2_fin = PS3_CO2_pol2 * 0.7 + PS3_weight_fac_pol2;
    PS3_CO2_pol3_fin = PS3_CO2_pol3 * 0.7 + PS3_weight_fac_pol3;
    PS3_CO2_exp_fin = PS3_CO2_exp * 0.7 + PS3_weight_fac_exp;

    PS5_CO2_lin_fin = PS5_CO2_lin * 0.7 + PS5_weight_fac_lin;
    PS5_CO2_pol2_fin = PS5_CO2_pol2 * 0.7 + PS5_weight_fac_pol2;
    PS5_CO2_pol3_fin = PS5_CO2_pol3 * 0.7 + PS5_weight_fac_pol3;
    PS5_CO2_exp_fin = PS5_CO2_exp * 0.7 + PS5_weight_fac_exp;

    PSP_CO2_lin_fin = PSP_CO2_lin * 0.7 + PSP_weight_fac_lin;
    PSP_CO2_pol2_fin = PSP_CO2_pol2 * 0.7 + PSP_weight_fac_pol2;
    PSP_CO2_pol3_fin = PSP_CO2_pol3 * 0.7 + PSP_weight_fac_pol3;
    PSP_CO2_exp_fin = PSP_CO2_exp * 0.7 + PSP_weight_fac_exp;

    PSV_CO2_lin_fin = PSV_CO2_lin * 0.7 + PSV_weight_fac_lin;
    PSV_CO2_pol2_fin = PSV_CO2_pol2 * 0.7 + PSV_weight_fac_pol2;
    PSV_CO2_pol3_fin = PSV_CO2_pol3 * 0.7 + PSV_weight_fac_pol3;
    PSV_CO2_exp_fin = PSV_CO2_exp * 0.7 + PSV_weight_fac_exp;

    // Prints

    console.log('CO2 equivalent of PlayStations (Linear Model): PS3:', PS3_CO2_lin_fin, 'kg, PS4:', PS4_CO2_lin, 'kg, PS5:', PS5_CO2_lin_fin, 'kg.');
    console.log('CO2 equivalent of PlayStations (2nd Degree Polynomial Model): PS3:', PS3_CO2_pol2_fin, 'kg, PS4:', PS4_CO2_pol2, 'kg, PS5:', PS5_CO2_pol2_fin, 'kg.');
    console.log('CO2 equivalent of PlayStations (3rd Degree Polynomial Model): PS3:', PS3_CO2_pol3_fin, 'kg, PS4:', PS4_CO2_pol3, 'kg, PS5:', PS5_CO2_pol3_fin, 'kg.');
    console.log('CO2 equivalent of PlayStations (Exponential Model): PS3:', PS3_CO2_exp_fin, 'kg, PS4:', PS4_CO2_exp, 'kg, PS5:', PS5_CO2_exp_fin, 'kg.');
    
    console.log('CO2 equivalent of PlayStation Handhelds (Linear Model): PSP:', PSP_CO2_lin_fin, 'kg, PS Vita:', PSV_CO2_lin_fin, 'kg.')
    console.log('CO2 equivalent of PlayStation Handhelds (2nd Degree Polynomial Model): PSP:', PSP_CO2_pol2_fin, 'kg, PS Vita:', PSV_CO2_pol2_fin, 'kg.')
    console.log('CO2 equivalent of PlayStation Handhelds (3rd Degree Polynomial Model): PSP:', PSP_CO2_pol3_fin, 'kg, PS Vita:', PSV_CO2_pol3_fin, 'kg.')
    console.log('CO2 equivalent of PlayStation Handhelds (Exponential Model): PSP:', PSP_CO2_exp_fin, 'kg, PS Vita:', PSV_CO2_exp_fin, 'kg.')


  } catch (error) {
    console.error('Error reading Excel file:', error);
  }
}

// Calculate averages
const averagePS3 = calculateAverage(calculatedAreas.PS3_area);
const averagePS4 = calculateAverage(calculatedAreas.PS4_area);
const averagePS5 = calculateAverage(calculatedAreas.PS5_area);
const averagePSP = calculateAverage(calculatedAreas.PSP_area);
const averagePSV = calculateAverage(calculatedAreas.PSV_area);

// Adjust data based on averages
const adjustedPS3LinearFitArea = adjustForAverage(calculatedAreas.PS3_area.LinearFit, averagePS3);
const adjustedPS4LinearFitArea = adjustForAverage(calculatedAreas.PS4_area.LinearFit, averagePS4);
const adjustedPS5LinearFitArea = adjustForAverage(calculatedAreas.PS5_area.LinearFit, averagePS5);
const adjustedPSPLinearFitArea = adjustForAverage(calculatedAreas.PSP_area.LinearFit, averagePSP);
const adjustedPSVLinearFitArea = adjustForAverage(calculatedAreas.PSV_area.LinearFit, averagePSV);


const adjustedPS3Poly2FitArea = adjustForAverage(calculatedAreas.PS3_area.Poly2Fit, averagePS3);
const adjustedPS4Poly2FitArea = adjustForAverage(calculatedAreas.PS4_area.Poly2Fit, averagePS4);
const adjustedPS5Poly2FitArea = adjustForAverage(calculatedAreas.PS5_area.Poly2Fit, averagePS5);
const adjustedPSPPoly2FitArea = adjustForAverage(calculatedAreas.PSP_area.Poly2Fit, averagePSP);
const adjustedPSVPoly2FitArea = adjustForAverage(calculatedAreas.PSV_area.Poly2Fit, averagePSV);


const adjustedPS3Poly3FitArea = adjustForAverage(calculatedAreas.PS3_area.Poly3Fit, averagePS3);
const adjustedPS4Poly3FitArea = adjustForAverage(calculatedAreas.PS4_area.Poly3Fit, averagePS4);
const adjustedPS5Poly3FitArea = adjustForAverage(calculatedAreas.PS5_area.Poly3Fit, averagePS5);
const adjustedPSPPoly3FitArea = adjustForAverage(calculatedAreas.PSP_area.Poly3Fit, averagePSP);
const adjustedPSVPoly3FitArea = adjustForAverage(calculatedAreas.PSV_area.Poly3Fit, averagePSV);


const adjustedPS3ExpFitArea = adjustForAverage(calculatedAreas.PS3_area.ExponentialFit, averagePS3);
const adjustedPS4ExpFitArea = adjustForAverage(calculatedAreas.PS4_area.ExponentialFit, averagePS4);
const adjustedPS5ExpFitArea = adjustForAverage(calculatedAreas.PS5_area.ExponentialFit, averagePS5);
const adjustedPSPExpFitArea = adjustForAverage(calculatedAreas.PSP_area.ExponentialFit, averagePSP);
const adjustedPSVExpFitArea = adjustForAverage(calculatedAreas.PSV_area.ExponentialFit, averagePSV);

// Function to calculate average
function calculateAverage(area) {
  return (area.start + area.end) / 2;
}

function adjustForAverage(value, average) {
  
  return value - average;
}

//  Calculation of CO2-eq values after adjustments for  fits
const PS4_CO2_lin_fin_adjusted = PS4_CO2_lin * 0.7 + PS4_weight_fac_lin - adjustedPS4LinearFitArea / 9;
const PS4_CO2_pol2_fin_adjusted = PS4_CO2_pol2 * 0.7 + PS4_weight_fac_pol2 - adjustedPS4Poly2FitArea / 9;
const PS4_CO2_pol3_fin_adjusted = PS4_CO2_pol3 * 0.7 + PS4_weight_fac_pol3 - adjustedPS4Poly3FitArea / 9;
const PS4_CO2_exp_fin_adjusted = PS4_CO2_exp * 0.7 + PS4_weight_fac_exp - adjustedPS4ExpFitArea / 9;

const PS5_CO2_lin_fin_adjusted = PS5_CO2_lin * 0.7 + PS5_weight_fac_lin - adjustedPS5LinearFitArea / 3;
const PS5_CO2_pol2_fin_adjusted = PS5_CO2_pol2 * 0.7 + PS5_weight_fac_pol2 - adjustedPS5Poly2FitArea / 3;
const PS5_CO2_pol3_fin_adjusted = PS5_CO2_pol3 * 0.7 + PS5_weight_fac_pol3 - adjustedPS5Poly3FitArea / 3;
const PS5_CO2_exp_fin_adjusted = PS5_CO2_exp * 0.7 + PS5_weight_fac_exp - adjustedPS5ExpFitArea / 3;

const PSP_CO2_lin_fin_adjusted = PSP_CO2_lin * 0.7 + PSP_weight_fac_lin - adjustedPSPLinearFitArea / 11;
const PSP_CO2_pol2_fin_adjusted = PSP_CO2_pol2 * 0.7 + PSP_weight_fac_pol2 - adjustedPSPPoly2FitArea / 11;
const PSP_CO2_pol3_fin_adjusted = PSP_CO2_pol3 * 0.7 + PSP_weight_fac_pol3 - adjustedPSPPoly3FitArea / 11;
const PSP_CO2_exp_fin_adjusted = PSP_CO2_exp * 0.7 + PSP_weight_fac_exp - adjustedPSPExpFitArea / 11;

const PSV_CO2_lin_fin_adjusted = PSV_CO2_lin * 0.7 + PSV_weight_fac_lin - adjustedPSVLinearFitArea / 8;
const PSV_CO2_pol2_fin_adjusted = PSV_CO2_pol2 * 0.7 + PSV_weight_fac_pol2 - adjustedPSVPoly2FitArea / 8;
const PSV_CO2_pol3_fin_adjusted = PSV_CO2_pol3 * 0.7 + PSV_weight_fac_pol3 - adjustedPSVPoly3FitArea / 8;
const PSV_CO2_exp_fin_adjusted = PSV_CO2_exp * 0.7 + PSV_weight_fac_exp - adjustedPSVExpFitArea / 8;


// Prints  PlayStations
console.log('Adjusted CO2 equivalent of PlayStation 4 (Linear Model):', PS4_CO2_lin_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation 4 (2nd Degree Polynomial Model):', PS4_CO2_pol2_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation 4 (3rd Degree Polynomial Model):', PS4_CO2_pol3_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation 4 (Exponential Model):', PS4_CO2_exp_fin_adjusted, 'kg.');


console.log('Adjusted CO2 equivalent of PlayStation Handhelds (Linear Model): PSP:', PSP_CO2_lin_fin_adjusted, 'kg, PS Vita:', PSV_CO2_lin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation Handhelds (2nd Degree Polynomial Model): PSP:', PSP_CO2_pol2_fin_adjusted, 'kg, PS Vita:', PSV_CO2_pol2_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation Handhelds (3rd Degree Polynomial Model): PSP:', PSP_CO2_pol3_fin_adjusted, 'kg, PS Vita:', PSV_CO2_pol3_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation Handhelds (Exponential Model): PSP:', PSP_CO2_exp_fin_adjusted, 'kg, PS Vita:', PSV_CO2_exp_adjusted, 'kg.');

console.log('Adjusted CO2 equivalent of PlayStation 5 (Linear Model):', PS5_CO2_lin_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation 5 (2nd Degree Polynomial Model):', PS5_CO2_pol2_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation 5 (3rd Degree Polynomial Model):', PS5_CO2_pol3_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation 5 (Exponential Model):', PS5_CO2_exp_fin_adjusted, 'kg.');

console.log('Adjusted CO2 equivalent of PlayStation Handhelds (Linear Model):', PSP_CO2_lin_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation Handhelds (2nd Degree Polynomial Model):', PSP_CO2_pol2_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation Handhelds (3rd Degree Polynomial Model):', PSP_CO2_pol3_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation Handhelds (Exponential Model):', PSP_CO2_exp_fin_adjusted, 'kg.');

console.log('Adjusted CO2 equivalent of PlayStation Vita (Linear Model):', PSV_CO2_lin_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation Vita (2nd Degree Polynomial Model):', PSV_CO2_pol2_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation Vita (3rd Degree Polynomial Model):', PSV_CO2_pol3_fin_adjusted, 'kg.');
console.log('Adjusted CO2 equivalent of PlayStation Vita (Exponential Model):', PSV_CO2_exp_fin_adjusted, 'kg.');


function calculateAreaTrapezoidal(x, y) {
  if (x.length < 2) {
    return 0;
  }

  let area = 0;
  for (let i = 1; i < x.length; i++) {
    // Calculate the segment width based on the spacing between data points
    const segmentWidth = x[i] - x[i - 1];
    const numSubdivisions = 10000; // Number of subdivisions per segment

    // Subdivide the segment and calculate the area of each trapezoid
    for (let j = 0; j < numSubdivisions; j++) {
      const x0 = x[i - 1] + (j / numSubdivisions) * segmentWidth;
      const x1 = x[i - 1] + ((j + 1) / numSubdivisions) * segmentWidth;
      const y0 = interpolateY(x0, x, y); // Interpolate the y-value at x0
      const y1 = interpolateY(x1, x, y); // Interpolate the y-value at x1
      const segmentHeight = (y0 + y1) / 2;
      area += (x1 - x0) * segmentHeight;
    }
  }

  return area;
}

// Function to interpolate y-value at a given x using linear interpolation
function interpolateY(x, xData, yData) {
  const i = findSegmentIndex(x, xData);
  if (i === -1) {
    // x is outside the range of xData, return 0 or handle it differently
    return 0;
  }

  const x0 = xData[i];
  const x1 = xData[i + 1];
  const y0 = yData[i];
  const y1 = yData[i + 1];
  const slope = (y1 - y0) / (x1 - x0);
  return y0 + slope * (x - x0);
}

// Function to find the index of the segment that contains x
function findSegmentIndex(x, xData) {
  for (let i = 0; i < xData.length - 1; i++) {
    if (x >= xData[i] && x <= xData[i + 1]) {
      return i;
    }
  }
  return -1; // x is outside the range of xData
}


function calculateAreas(intervals, data, linearModel, poly2Model, poly3Model, expfit) {
  const areas = {}; // Initialize an object to store the calculated areas

  for (const interval of intervals) {
    const { start, end, name } = interval;
    const xValues = data.map((point) => point[0]);
    const yValues = data.map((point) => point[1]);
    const mask = xValues.map((x) => x >= start && x <= end);

    const xInterval = xValues.filter((x, i) => mask[i]);
    const yInterval = yValues.filter((y, i) => mask[i]);

    const linearFit = linearModel.points.filter((point) => point[0] >= start && point[0] <= end);
    const poly2Fit = poly2Model.points.filter((point) => point[0] >= start && point[0] <= end);
    const poly3Fit = poly3Model.points.filter((point) => point[0] >= start && point[0] <= end);

    // Calculate the area under the curve for the exponential fit
    const areaExp = calculateAreaTrapezoidal(xInterval, yInterval);

    // Store the calculated areas in the areas object
    areas[name] = {
      LinearFit: calculateAreaTrapezoidal(xInterval, linearFit.map((point) => point[1])),
      Poly2Fit: calculateAreaTrapezoidal(xInterval, poly2Fit.map((point) => point[1])),
      Poly3Fit: calculateAreaTrapezoidal(xInterval, poly3Fit.map((point) => point[1])),
      ExponentialFit: areaExp,
    };
  } // <-- Missing closing brace was added here

  return areas; // Return the object containing the calculated areas
}


function printFitStatistics(modelName, model, data) {
  // Calculate predictions from the model
  const predictedValues = data.map((point) => model.predict(point[0])[1]);

  // Calculate residuals
  const residuals = data.map((point, index) => point[1] - predictedValues[index]);

  // Calculate chi-squared
  const chiSquared = residuals.reduce((accumulator, residual) => accumulator + Math.pow(residual, 2), 0);

  // Calculate degrees of freedom
  const degreesOfFreedom = data.length - model.equation.length;

  // Calculate reduced chi-squared
  const reducedChiSquared = chiSquared / degreesOfFreedom;

  // Print fit statistics
  console.log(`${modelName}:`);
  console.log(`Chi-squared: ${chiSquared}`);
  console.log(`Reduced Chi-squared: ${reducedChiSquared}`);
}

function plotDataAndFits(data, linearFit, poly2Fit, poly3Fit, expfit) {
  const xValues = data.map((point) => point[0]);
  const yValues = data.map((point) => point[1]);

  const linearTrace = {
    x: linearFit.map((point) => point[0]),
    y: linearFit.map((point) => point[1]),
    mode: 'lines',
    name: 'Linear Fit',
  };

  const poly2Trace = {
    x: poly2Fit.map((point) => point[0]),
    y: poly2Fit.map((point) => point[1]),
    mode: 'lines',
    name: '2nd Degree Polynomial Fit',
  };

  const poly3Trace = {
    x: poly3Fit.map((point) => point[0]),
    y: poly3Fit.map((point) => point[1]),
    mode: 'lines',
    name: '3rd Degree Polynomial Fit',
  };

  const expfitTrace = {
    x: xValues,
    y: expfit.map((point) => point[1]),
    mode: 'lines',
    name: 'Exponential Fit',
  };

  const dataTrace = {
    x: xValues,
    y: yValues,
    mode: 'markers',
    type: 'scatter',
    name: 'Data',
  };

  const layout = {
    title: 'Fits of Different Models',
    xaxis: { title: 'Year' },
    yaxis: { title: 'Total Emissions' },
  };

  const graphData = [dataTrace, linearTrace, poly2Trace, poly3Trace, expfitTrace];

  const graphOptions = {
    layout: layout,
    filename: 'fits',
    fileopt: 'overwrite',
  };

  plotly.plot(graphData, graphOptions, (err, msg) => {
    if (err) {
      console.error('Error plotting:', err);
    } else {
      console.log('Plotly URL:', msg.url);
    }
  });
}


readExcelData();

xtest = 3
ytest = -0.091182706766917 * xtest + 2.950368421052629
console.log('test', ytest)