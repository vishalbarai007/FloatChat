import pandas as pd
import xarray as xr
import numpy as np


def nc_to_dataframe(nc_file) -> pd.DataFrame:
    """Converts a NetCDF file into a flat Pandas DataFrame."""
    try:
        ds = xr.open_dataset(nc_file, engine="netcdf4")
    except Exception:
        ds = xr.open_dataset(nc_file, engine="scipy")

    lats = ds["LATITUDE"].values
    lons = ds["LONGITUDE"].values
    times = pd.to_datetime(ds["JULD"].values)
    depths = ds["PRES"].values
    temps = ds["TEMP"].values
    salts = ds["PSAL"].values

    try:
        chl = ds["CHLA"].values if "CHLA" in ds else np.full_like(depths, np.nan)
    except Exception:
        chl = np.full_like(depths, np.nan)

    records = []

    for i in range(len(lats)):
        lat = lats[i]
        lon = lons[i]
        t = times[i]

        for j in range(depths.shape[1]):
            d = depths[i, j]
            temp = temps[i, j]
            sal = salts[i, j]
            chla = chl[i, j]

            if pd.isna(d) or pd.isna(temp):
                continue

            records.append(
                {
                    "latitude": float(lat),
                    "longitude": float(lon),
                    "time": t.strftime("%Y-%m-%d %H:%M:%S"),
                    "depth": float(d),
                    "temperature": float(temp),
                    "salinity": float(sal),
                    "chla": float(chla) if not pd.isna(chla) else None,
                }
            )

    df = pd.DataFrame.from_records(records)
    return df
