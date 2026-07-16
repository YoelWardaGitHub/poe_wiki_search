Add-Type -AssemblyName System.Drawing

function New-Icon([int]$S, [string]$Path) {
  $bmp = New-Object System.Drawing.Bitmap($S, $S)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.PixelOffsetMode = 'HighQuality'

  $bg = [System.Drawing.Color]::FromArgb(255, 22, 22, 34)
  $gold = [System.Drawing.Color]::FromArgb(255, 212, 175, 55)
  $crimson = [System.Drawing.Color]::FromArgb(255, 214, 69, 65)
  $lens = [System.Drawing.Color]::FromArgb(255, 48, 44, 66)

  # Rounded-rect background
  $r = [float]($S * 0.22)
  $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $gp.AddArc(0, 0, $d, $d, 180, 90)
  $gp.AddArc($S - $d, 0, $d, $d, 270, 90)
  $gp.AddArc($S - $d, $S - $d, $d, $d, 0, 90)
  $gp.AddArc(0, $S - $d, $d, $d, 90, 90)
  $gp.CloseFigure()
  $bgBrush = New-Object System.Drawing.SolidBrush($bg)
  $g.FillPath($bgBrush, $gp)

  # Magnifying glass geometry
  $cx = [float]($S * 0.42)
  $cy = [float]($S * 0.42)
  $rad = [float]($S * 0.24)
  $stroke = [float]($S * 0.09)

  # Lens fill
  $lensBrush = New-Object System.Drawing.SolidBrush($lens)
  $g.FillEllipse($lensBrush, $cx - $rad, $cy - $rad, $rad * 2, $rad * 2)

  # Gold -> crimson gradient for ring + handle
  $rectF = New-Object System.Drawing.RectangleF(0, 0, $S, $S)
  $grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rectF, $gold, $crimson, 45.0)
  $pen = New-Object System.Drawing.Pen($grad, $stroke)
  $pen.StartCap = 'Round'
  $pen.EndCap = 'Round'

  # Handle
  $hx1 = $cx + $rad * 0.72
  $hy1 = $cy + $rad * 0.72
  $hx2 = [float]($S * 0.82)
  $hy2 = [float]($S * 0.82)
  $g.DrawLine($pen, $hx1, $hy1, $hx2, $hy2)

  # Ring
  $g.DrawEllipse($pen, $cx - $rad, $cy - $rad, $rad * 2, $rad * 2)

  $g.Dispose()
  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "wrote $Path"
}

New-Icon 128 "$PSScriptRoot\src\icon.png"
New-Icon 48 "$PSScriptRoot\src\icon-48.png"
New-Icon 16 "$PSScriptRoot\src\icon-16.png"
